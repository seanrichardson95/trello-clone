/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCard, editCard } from '../../actions/CardActions';
import { addComment } from '../../actions/CommentActions';
import ActivitySection from './ActivitySection';
import LabelsPopover from './LabelsPopover';

const Card = () => {
  const cardId = useParams().id;
  const dispatch = useDispatch();
  const history = useHistory();
  const card = useSelector((state) => {
    return state.cards.find((card) => card._id === cardId);
  });
  const [cardFetched, setCardFetched] = useState(false);
  const [title, setTitle] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const [isEditingLabels, setIsEditingLabels] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    if (cardFetched) {
      setTitle(card.title);
      setDescription(card.description);
      setIsArchived(card.archived);
    }
  }, [cardFetched])


  useEffect(() => {
    dispatch(fetchCard(cardId, () => setCardFetched(true)));
  }, [dispatch, cardId])


  const handleCloseCard = () => {
    history.push(`/boards/${card.boardId}`);
  }

  const handleChangeTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const handleNewComment = (e) => {
    e.preventDefault();
    dispatch(addComment(comment, cardId));
    setComment('');
  }

  const handleSave = (inputType, value, callback) => {
    return function(e) {
      e.preventDefault();
      if(inputType === "title" && value === "") {
        return
      }

      const obj = {card: {}};

      obj["card"][inputType] = value;

      dispatch(editCard(obj, cardId));

      if(callback) {
        callback();
      }
    }
  };


  const lists = useSelector(state => state.lists);
  let list;
  if (card) {
      list = lists.find(l => l._id === card.listId);
  }

  if (!card) {
    return null;
  }


  // in list <a className="link">{list.title}</a>

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <i className="x-icon icon close-modal" onClick={handleCloseCard}></i>
        {isArchived ?
        <div className="archived-banner">
          <i className="file-icon icon"></i>This card is archived.
        </div>
        : ""}
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea className="list-title" style={{ height: "45px" }} value={title} onChange={handleChangeTitle} onBlur={handleSave("title", title)}>
          </textarea>
          <p>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <li className="labels-section">
                  <h3>Labels</h3>
                  {card.labels.map(color => {
                    return (
                    <div key={`${card._id}_${color}`} className="member-container">
                      <div className={`${color} label colorblindable`}></div>
                    </div>
                    );
                  })}
                  <div className="member-container">
                    <i className="plus-icon sm-icon" onClick={() => setIsEditingLabels(true)}></i>
                  </div>
                </li>
                <li className="due-date-section">
                  <h3>Due Date</h3>
                  <div id="dueDateDisplay" className="overdue completed">
                    <input
                      id="dueDateCheckbox"
                      type="checkbox"
                      className="checkbox"
                      checked=""
                    />
                    {card.dueDate ? new Date(card.dueDate).toDateString() : "No due date"}
                    {card.dueDate ? new Date(card.dueDate) > Date.now() ? <span>(past due)</span> : null : null}
                  </div>
                </li>
              </ul>
              <form className="description">
                <p>Description</p>
                {!isEditingDescription &&
                  <>
                    <span id="description-edit" className="link" onClick={() => setIsEditingDescription(true)}>
                      Edit
                    </span>
                    <p className="textarea-overlay">
                      {card.description}
                    </p>
                    <p id="description-edit-options" className={isEditingDescription ? "" : "hidden"}>

                      You have unsaved edits on this field.{" "}
                      <span className="link">View edits</span> -{" "}
                      <span className="link" onClick={() => setIsEditingDescription(false)}>Discard</span>
                    </p>
                  </>
                }
                {isEditingDescription &&
                <>
                  <textarea className="textarea-toggle" rows="1" autoFocus value={description} onChange={(e) => setDescription(e.target.value)}>

                  </textarea>
                  <div>
                    <div className="button" value="Save" onClick={handleSave("description", description, () => setIsEditingDescription(false))}>
                      Save
                    </div>
                    <i className="x-icon icon" onClick={() => setIsEditingDescription(false)}></i>
                  </div>
                </>
                }

              </form>

            </li>
            <li className="comment-section">
              <h2 className="comment-icon icon">Add Comment</h2>
              <div>
                <div className="member-container">
                  <div className="card-member">TP</div>
                </div>
                <div className="comment">
                  <label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required=""
                      rows="1"
                      placeholder="Write a comment..."
                    ></textarea>
                    <div>
                      <a className="light-button card-icon sm-icon"></a>
                      <a className="light-button smiley-icon sm-icon"></a>
                      <a className="light-button email-icon sm-icon"></a>
                      <a className="light-button attachment-icon sm-icon"></a>
                    </div>
                    <div>
                      <input
                        onClick={handleNewComment}
                        type="submit"
                        className={`button ${comment.length === 0 ? "not-implemented" : ""}`}
                        value="Save"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </li>
            <ActivitySection />
          </ul>
        </section>
        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li>
            <li className="label-button">
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li>
            <li className="date-button not-implemented">
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
            <li className="attachment-button not-implemented">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li>
          </ul>
          <h2>Actions</h2>
          <ul>
            <li className="move-button">
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li className="copy-button">
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            {!isArchived ?
            <li className="archive-button" onClick={handleSave('archived', true, () => setIsArchived(true))}>
              <i className="file-icon sm-icon "></i>Archive
            </li>
            : ""}
            {isArchived ?
            <>
              <li className="unarchive-button" onClick={handleSave('archived', false, () => setIsArchived(false))}>
                <i className="send-icon sm-icon"></i>Send to board
              </li>
              <li className="red-button">
                <i className="minus-icon sm-icon"></i>Delete
              </li>
             </>
             : ""
            }
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul>
        </aside>
      </div>
      {isEditingLabels && <LabelsPopover setIsEditingLabels={setIsEditingLabels} />}
    </div>
  );
};

export default Card;
