const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.homePage);

router.get("/api/search", bookController.searchBooks);

router.get("/books/:bookId", bookController.bookPage);

module.exports = router;
