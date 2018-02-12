const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.get("/", bookController.homePage);

router.get("/api/search", bookController.searchBooks);

router.get("/:bookId", bookController.bookPage);

router.post(
  "/api/search",
  upload.fields([
    { name: "bookImage", maxCount: 1 },
    { name: "bookFile", maxCount: 1 }
  ]),
  bookController.bookUpload
);

module.exports = router;
