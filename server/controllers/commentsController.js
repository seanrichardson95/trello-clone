const Comment = require("../models/comment");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createComment = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const comment = {
      text: req.body.comment.text,
      cardId: req.body.cardId,
    };

    try {
      const newComment = await Comment.create(comment);
      newComment.save();
      req.comment = newComment;
      next();
    } catch (err) {
      next(new HttpError("Creating comment failed, please try again", 500));
    }
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const sendComment = (req, res, next) => {
  res.json({ comment: req.comment });
};

exports.createComment = createComment;
exports.sendComment = sendComment;
