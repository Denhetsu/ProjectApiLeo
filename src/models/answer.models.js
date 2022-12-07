const { model, Schema } = require("mongoose");

const schema = new Schema({
  text: String,

  tweet: {
    type: Schema.Types.ObjectId,
    ref: "Tweet",
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Answer", schema, "answers");
