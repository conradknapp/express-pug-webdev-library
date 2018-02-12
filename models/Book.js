const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  author: String,
  description: String,
  bookImage: String,
  bookFile: String,
  tags: [String]
});

bookSchema.index({
  title: "text",
  description: "text"
});

module.exports = mongoose.model("Book", bookSchema);
