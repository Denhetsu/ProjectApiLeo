const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: String,
  password: String,
  mail: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", schema, "users");
