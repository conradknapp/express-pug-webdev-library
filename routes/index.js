const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.homePage);

router.get("/api/search", bookController.searchBooks);

module.exports = router;
