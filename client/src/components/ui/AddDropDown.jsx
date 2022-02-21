import React, {useState, useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { createCard } from "../../actions/CardActions";


const AddDropDown = ({ onToggle, isOpen, listId }) => {
  const [title, setTitle] = useState("");

  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
    }
  , [isOpen]);
  
  const handleEditTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const handleAddCard = (e) => {
    e.preventDefault();
    dispatch(createCard(listId, title));
    onToggle(false);
  }

    return (
      <>
        <div className="add-dropdown add-bottom active-card">
          <div className="card">
            <div className="card-info"></div>
            <textarea ref={inputRef} name="add-card" value={title} onChange={handleEditTitle}></textarea>
            <div className="members"></div>
          </div>
          <a className="button" onClick={handleAddCard}>Add</a>
          <i className="x-icon icon" onClick={() => onToggle(false)}></i>
          <div className="add-options">
            <span>...</span>
          </div>
        </div>
        <div className="add-card-toggle" data-position="bottom" onClick={() => onToggle(true)}>
          Add a card...
        </div>
      </>
      
    )
}

export default AddDropDown;