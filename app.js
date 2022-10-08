require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();
const PORT = 8000 || process.env.PORT;

// Routes
const detector = require("./routes/detector.routes");

// set up
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use("/api/detector", detector);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
