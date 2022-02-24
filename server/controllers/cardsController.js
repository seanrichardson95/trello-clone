const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createCard = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const list = await List.findById(req.body.listId);

    const newCard = {
      title: req.body.card.title,
      listId: req.body.listId,
      boardId: list.boardId,
      description: "",
      completed: false,
      archived: false,
      position: 65535.0,
      comments: [],
      commentsCount: 0,
      actions: [],
      labels: [],
      dueDate: null,
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
    // populate comments

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

const editCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      let card = await Card.findOneAndUpdate(
        { _id: req.params.id },
        req.body.card,
        {
          new: true,
        }
      );

      req.card = card;
      next();
    } catch (e) {
      next(new HttpError("Card to update not found, please try again", 500));
    }
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const addComment = async (req, res, next) => {
  console.log(req.comment);
  try {
    const card = await Card.findById(req.comment.cardId);
    console.log(
      "comments count: ",
      card.commentsCount,
      typeof card.commentsCount
    );
    const newCard = await Card.findOneAndUpdate(
      { _id: req.comment.cardId },
      {
        comments: [...card.comments, req.comment._id],
        commentsCount: card.comments.length + 1,
      },
      { new: true }
    );
    console.log("new Card: ", newCard);
    next();
  } catch (err) {
    console.log(err);
    next(new HttpError("Creating card failed, please try again", 500));
  }
};

exports.sendCard = sendCard;
exports.createCard = createCard;
exports.getCard = getCard;
exports.editCard = editCard;
exports.addComment = addComment;
