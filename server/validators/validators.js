const { check } = require("express-validator");

exports.validateList = [check("list.title").not().isEmpty()];
exports.validateCard = [check("card.title").not().isEmpty()];
exports.validateBoard = [check("board.title").not().isEmpty()];
