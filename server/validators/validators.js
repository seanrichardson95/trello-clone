const { check, oneOf } = require("express-validator");

exports.validateList = [check("list.title").not().isEmpty()];
exports.validateEditList = oneOf([check("title").not().isEmpty(), check("position").not().isEmpty()]);
exports.validateCard = [check("card.title").not().isEmpty()];
exports.validateBoard = [check("board.title").not().isEmpty()];
