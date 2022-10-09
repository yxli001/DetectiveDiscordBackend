require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// Routes
const detector = require("./routes/detector.routes");

// set up
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
});

app.use("/api/detector", detector);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
