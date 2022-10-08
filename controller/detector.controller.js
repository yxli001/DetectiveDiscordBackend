const axios = require("axios");

const detection = async (req, res) => {
    try {
        // auth

        const response = await axios.post(
            "https://nlapi.expert.ai/v2/detect/hate-speech/en",
            {
                document: {
                    text: "I love butterflies",
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

            return res.json({ hateSpeech: true, labels });
        } else {
            return res.json({ hateSpeech: false });
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { detection };
