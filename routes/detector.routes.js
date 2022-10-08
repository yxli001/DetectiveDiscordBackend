const express = require("express");
const router = express.Router();
const { detection } = require("../controller/detector.controller.js");
router.post("/", detection);

module.exports = router;
