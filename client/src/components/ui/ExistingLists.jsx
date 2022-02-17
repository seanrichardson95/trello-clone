import React from "react";
import { useSelector } from "react-redux";
import List from './List';

const ExistingLists = ({ boardId }) => {
  const lists = useSelector(state => state.lists.filter(list => list.boardId === boardId));

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
        {lists.map(list => <List key={list._id} id={list._id} />)}
      </div>
    </div>
  );
};

export default ExistingLists;