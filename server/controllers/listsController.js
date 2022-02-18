const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const newList = { 
      title: req.body.title || "My List", 
      boardId: req.body.boardId ,
      position: req.body.position || 65535,
      cards: []
    };

    List.create(newList)
      .then((list) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(
          (board) => res.json({ board })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};
