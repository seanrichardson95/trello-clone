const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createCard = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const newCard = {
      title: req.body.card.title,
      listId: req.body.listId,
    };

    try {
      const card = await Card.create(newCard);
      req.card = card;
      next();
    } catch (err) {
      next(new HttpError("Creating card failed, please try again", 500));
    }
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const getCard = async (req, res, next) => {
  const id = req.params.id;

  try {
    const card = await Card.findById(id);

    if (!card) {
      throw new Error();
    }

    res.json(card);
  } catch (err) {
    next(new HttpError(`Card id: ${id} cannot be found`, 500));
  }
};

const sendCard = (req, res, next) => {
  res.json({ card: req.card });
};

exports.sendCard = sendCard;
exports.createCard = createCard;
exports.getCard = getCard;
