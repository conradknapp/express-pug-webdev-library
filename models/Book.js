const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String]
});

bookSchema.index({
  title: "text",
  description: "text"
});

module.exports = mongoose.model("Book", bookSchema);
