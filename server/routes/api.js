const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const {
  validateBoard,
  validateCard,
  validateList,
  validateEditList,
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

module.exports = router;
