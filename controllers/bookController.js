const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const multer = require("multer");
const gm = require("gm").subClass({ imageMagick: true });

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
  var header = new Buffer("474946383961", "hex");
  var logicalScreenDescriptor = new Buffer("01000100800100", "hex");
  var imageDescriptor = new Buffer("2c000000000100010000", "hex");
  var imageData = new Buffer("0202440100", "hex");

  await gm(req.files.bookImage[0].path)
    .toBuffer("RGB", async (error, buffer) => {
      var gif = [
        header,
        logicalScreenDescriptor,
        buffer.slice(0, 3),
        new Buffer([0, 0, 0]),
        imageDescriptor,
        imageData
      ];
      var base64Img = `data:image/gif;base64,${Buffer.concat(gif).toString(
        "base64"
      )}`;

      const book = await new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        tags: req.body.tags,
        bookImage: req.files.bookImage[0].path,
        bookSmallImage: base64Img,
        bookFile: req.files.bookFile[0].path
      });

      const response = await book.save();
    })
    .resize(240, 240, "!")
    .colors(1);
  // .write(`uploads/250-${req.files.bookImage[0].filename}`, err => {
  //   if (err) console.error(err);
  // });
};
