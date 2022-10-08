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

app.use("/api/detector", detector);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
