const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String },
  cardId: {
    ref: "Card",
    type: mongoose.Types.ObjectId,
  },
}, { timestamps: true }
);

  const Comment = mongoose.model("Comment", CommentSchema);

  module.exports = Comment;
