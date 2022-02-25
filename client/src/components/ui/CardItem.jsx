import React from 'react';
import { useSelector } from "react-redux";

const CardItem = ({ id, handleShowCard }) => {
  const card = useSelector(state => state.cards.find(card => card._id === id));

  return (
    <div className="card-background" onClick={handleShowCard}>
      <div className="card ">
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
          {card.labels.map(color => (<div key={color} className={`card-label ${color} colorblindable`}></div>))}
          <p>
            {card.title}
          </p>
        </div>
        <div className="card-icons">
          {card.dueDate &&
          <i className="clock-icon sm-icon overdue-recent completed">
            {new Date(card.dueDate).toDateString()}
          </i>}
          {card.description && <i className="description-icon sm-icon"></i>}
          {card.commentsCount > 0 && <i className="comment-icon sm-icon"></i>}
        </div>
      </div>
    </div>
  );
};

export default CardItem;