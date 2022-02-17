import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from './List';
import * as actions from "../../actions/ListActions";

const ExistingLists = ({ boardId }) => {
  const dispatch = useDispatch();
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const lists = useSelector(state => state.lists.filter(list => list.boardId === boardId));

  const createList = (newList) => {
    dispatch(actions.createList(newList));
  };

  const handleAddList = (e) => {
    e.preventDefault();
    setAddingList(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = { newListTitle, boardId };
    createList(newList);
  };

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
        {lists.map(list => <List key={list._id} id={list._id} />)}
      </div>
      <div id="new-list" className={`new-list ${addingList ? "selected" : ""}`}>
          <span onClick={handleAddList}>Add a list...</span>
          <input type="text" placeholder="Add a list..." onChange={(e) => setNewListTitle(e.target.value)} value={newListTitle}/>
          <div>
            <input type="submit" className="button" value="Save" onClick={handleSubmit} />
            <i className="x-icon icon" onClick={() => setAddingList(false)}></i>
          </div>
        </div>
    </div>
  );
};

export default ExistingLists;