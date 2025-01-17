const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const commentsController = require("../controllers/commentsController");
const {
  validateBoard,
  validateCard,
  validateList,
  validateEditList,
  validateComment,
} = require("../validators/validators");

router.get("/boards/:id", boardsController.getBoard);

router.get("/boards", boardsController.getBoards);

router.post("/boards", validateBoard, boardsController.createBoard);

router.post(
  "/lists",
  validateList,
  listsController.createList,
  boardsController.addListToBoard,
  listsController.sendList
);

router.put(
  "/lists/:id",
  validateEditList,
  listsController.editList,
  listsController.sendList
);

router.get("/cards/:id", cardsController.getCard);

router.post(
  "/cards",
  validateCard,
  cardsController.createCard,
  listsController.addCardToList,
  cardsController.sendCard
);

router.put("/cards/:id", cardsController.editCard, cardsController.sendCard);

router.post(
  "/comments",
  validateComment,
  commentsController.createComment,
  cardsController.addComment,
  commentsController.sendComment
);

module.exports = router;
