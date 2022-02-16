const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const getBoard = async (req, res, next) => {
  const id = req.params.id;
  try {
    const board = await Board.findById(id)
      .populate
      //   {
      //   path: "lists",
      //   populate: {
      //     path: "cards",
      //   },
      // }
      ();

    if (!board) {
      throw new Error();
    }

    res.json(board);
  } catch (err) {
    next(new HttpError(`Board id: ${id} cannot be found`, 500));
  }
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
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

exports.getBoard = getBoard;
exports.getBoards = getBoards;
exports.createBoard = createBoard;
