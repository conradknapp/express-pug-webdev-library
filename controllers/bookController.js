const mongoose = require("mongoose");
const Book = mongoose.model("Book");

exports.homePage = (req, res) => {
  res.render("layout");
};

exports.searchBooks = async (req, res) => {
  // res.json({ it: "worked" });
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
  // .limit(10);
  res.json(book);
};
