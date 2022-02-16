const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, "The Board title is required"],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  boardId: {
    type: mongoose.Types.ObjectId,
    ref: "Board",
  },
  position: {
    type: mongoose.Decimal128,
  },
  cards: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Card",
    },
  ],
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
