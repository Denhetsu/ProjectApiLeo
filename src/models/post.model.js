const { model, Schema } = require("mongoose");

const schema = new Schema({
  text: String,
  isSurvey: Boolean,
  answers: [String],

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  answerIds: [ { type: Schema.Types.ObjectId, ref: "Answer" } ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Post", schema, "posts");
