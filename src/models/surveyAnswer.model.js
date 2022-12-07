const { model, Schema } = require("mongoose");

const schema = new Schema({
  choice: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
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

module.exports = model("SurveyAnswer", schema, "survey-answers");
