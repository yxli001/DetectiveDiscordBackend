const express = require("express");
const router = express.Router();
const { scanner } = require("../controller/scanner.controller.js");

router.post("/", scanner);

module.exports = router;
