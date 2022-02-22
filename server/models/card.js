const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  labels: [
    {
      type: String,
    },
  ],
  listId: {
    type: mongoose.Types.ObjectId,
    ref: "List",
  },
  position: {
    type: mongoose.Decimal128,
  },
  archived: {
    type: Boolean,
  },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
  },
  boardId: {
    type: mongoose.Types.ObjectId,
    ref: "Board",
  },
  commentsCount: {
    type: Number,
  },
  comments: [
    {
      ref: "Comment",
      type: mongoose.Types.ObjectId
    }
  ],
  actions: [
    {
      ref: "Action",
      type: mongoose.Types.ObjectId
    }
  ],
}, { timestamps: true }
);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
