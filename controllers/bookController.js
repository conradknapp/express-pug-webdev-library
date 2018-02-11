const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const multer = require("multer");

exports.homePage = (req, res) => {
  res.render("layout");
};

exports.searchBooks = async (req, res) => {
  const book = await Book.find(
    {
      $text: {
        $search: req.query.q
      }
    },
    {
      score: {
        $meta: "textScore"
      }
    }
  );
  res.json(book);
};

exports.bookPage = (req, res) => {
  res.render("results");
};

exports.bookUpload = (req, res) => {};
