const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  description: {
    type: String,
  },
  cardId: {
    type: mongoose.Types.ObjectId,
    ref: "Card",
  },
}, { timestamps: true }
);

  const Action = mongoose.model("Action", ActionSchema);

  module.exports = Action;