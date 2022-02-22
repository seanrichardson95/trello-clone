import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Board from './Board';

const BoardWithModal = () => {
  const cardId = useParams().id;
  const card = useSelector(state => state.cards.find(card => card._id === cardId));
  const list = useSelector(state => state.lists.find(list => list._id === card.listId));
  const board = useSelector(state => state.boards.find(board => board._id === list.boardId));

  return (
    <Board boardId={board._id} cardId={cardId} isModalOpen={true} />
  );
};

export default BoardWithModal;
