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

exports.bookPage = async (req, res) => {
  const book = await Book.findOne({ _id: req.params.bookId });
  res.render("results", { book });
};

exports.bookUpload = async (req, res) => {
  const book = await new Book({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    tags: req.body.tags,
    bookImage: req.files.bookImage[0].path,
    bookFile: req.files.bookFile[0].path
  });
  book
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.error(err);
    });
};
