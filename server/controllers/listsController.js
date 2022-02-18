const List = require("../models/list");
const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  console.log(req.body);
  if (errors.isEmpty()) {
    const newList = {
      title: req.body.list.title || "My List",
      boardId: req.body.boardId,
      position: req.body.list.position || 65535,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      cards: [],
    };
    try {
      let list = await List.create(newList);
      req.list = list
      next()
    } catch (e) {
      next(new HttpError("Creating list failed, please try again", 500));
    }
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const sendList = (req, res, next) => {
  res.json({ list: req.list });
}

exports.createList = createList;
exports.sendList = sendList;
