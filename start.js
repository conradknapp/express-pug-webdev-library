const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./models/Book");

mongoose.connect(keys.MONGO_URI);
mongoose.connection.on("error", err => {
  console.error(err.message);
});

const app = require("./app");

app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running →  PORT ${server.address().port}`);
});
