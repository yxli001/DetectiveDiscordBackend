const axios = require("axios");

const detection = async (req, res) => {
    const { text } = req.body;

    try {
        // auth

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

            const badWordResponse = await axios.post(
                `https://api.apilayer.com/bad_words?censor_character={*}`,
                {
                    text,
                },
                {
                    headers: {
                        apikey: process.env.BAD_WORD_API_KEY,
                    },
                }
            );

            if (badWordResponse.data.bad_words_total > 0) {
                labels.push("Bad word");
            }

            return res.json({ hateSpeech: true, labels });
        } else {
            const badWordResponse = await axios.post(
                `https://api.apilayer.com/bad_words?censor_character={*}`,
                {
                    text,
                },
                {
                    headers: {
                        apikey: process.env.BAD_WORD_API_KEY,
                    },
                }
            );

            if (badWordResponse.data.bad_words_total > 0) {
                return res.json({ hateSpeech: true, labels: ["Bad Word"] });
            } else {
                return res.json({ hateSpeech: false });
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { detection };
