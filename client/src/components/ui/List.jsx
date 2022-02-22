import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateList } from "../../actions/ListActions";
import AddDropDown from "./AddDropDown";
import CardItem from './CardItem';

const List = ({ id, onShowCard }) => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.lists.find(list => list._id === id));
  const cards = useSelector(state => state.cards.filter(card => card.listId === id));
  const [title, setTitle] = useState(list.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const toggleEditing = () => {
    setIsEditingTitle(!isEditingTitle)
  };

  const handleEditTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const handleBlur = async () => {
    if (title === '') {
      setTitle(list.title);
    } else if (title !== list.title) {
      dispatch(updateList(list._id, { title }));
    }
    setIsEditingTitle(false)
  }

  return (
    <div className={`list-wrapper ${isAddingCard ? "add-dropdown-active" : ""}`}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {!isEditingTitle && <p className="list-title" onClick={toggleEditing}>{list.title}</p>}
            {isEditingTitle && <input type="text" className="list-title" value={title} onChange={handleEditTitle} onBlur={handleBlur}/>}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id={`list-${id}-cards`}>
            {cards.map(card => <CardItem key={card._id} id={card._id} handleShowCard={onShowCard(card._id)} />)}
          </div>
          <AddDropDown onToggle={setIsAddingCard} isOpen={isAddingCard} listId={id}/>
        </div>
      </div>
    </div>
  );
};

export default List;
