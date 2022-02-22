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
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Date,
  },
  boardId: {
    type: mongoose.Types.ObjectId,
    ref: "Board",
  },
  comments: [
    {
      text: { type: String },
      cardId: {
        ref: "Card",
        type: mongoose.Types.ObjectId,
      },
      createdAt: { type: Date },
      updatedAt: { type: Date }
    }
  ],
  commentsCount: {
    type: Number,
  },
  actions: [
    {
      description: {
        type: String,
      },
      createdAt: {
        type: Date,
      },
      updatedAt: {
        type: Date,
      },
      card_id: {
        type: mongoose.Types.ObjectId,
        ref: "Card",
      },
    },
  ],
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
