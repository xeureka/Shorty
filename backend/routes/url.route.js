const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  redirectUrl,
} = require("../controllers/url.controller");

router.post("/", createShortUrl);

router.get("/:shortCode", redirectUrl);

module.exports = router;
