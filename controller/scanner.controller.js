const { convert } = require("html-to-text");
const axios = require("axios");

const detector = async (text) => {
    const response = await axios.post(
        "https://nlapi.expert.ai/v2/detect/hate-speech/en",
        {
            document: {
                text: text,
            },
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.EXPERT_AI_TOKEN}`,
                "Content-Type": "application/json; charset=utf-8",
            },
        }
    );

    const data = response.data.data;
    if (data.categories.length > 0) {
        const labels = [];
        data.categories.forEach((category) => {
            labels.push(category.label);
        });

        return { hateSpeech: true, labels };
    }
    return { hateSpeech: false };
};

const scanner = async (req, res) => {
    const { webPageURL } = req.body;
    try {
        const response = await axios.get(webPageURL);
        const text = convert(response.data).trim();
        const numCharsPerChunk = Math.floor(text.length / 10);
        let numBad = 0;
        let numGood = 0;
        let start = 0;

        const labels = [];
        for (let i = 0; i < 10; i++) {
            const result = await detector(
                text.substring(start, start + numCharsPerChunk)
            );

            if (result.hateSpeech) {
                numBad += 1;
            } else {
                numGood += 1;
            }
            start += numCharsPerChunk;

            result.labels?.forEach((label) => {
                if (labels.indexOf(label) === -1) {
                    labels.push(label);
                }
            });
        }

        return res.json({
            percent: (numBad / (numBad + numGood)) * 100,
            labels,
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = { scanner };
