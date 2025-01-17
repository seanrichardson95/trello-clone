import React from 'react';

const Comment = ({ text, createdAt }) => {
  return (
    <li className="activity-comment">
      <div className="member-container">
        <div className="card-member">T3</div>
      </div>
      <h3>Team 3</h3>
      <div className="comment static-comment">
        <span>{text}</span>
      </div>
      <small>
        Created at {(new Date(createdAt)).toString()} <span className="link">Edit</span> -{" "}
        <span className="link">Delete</span>
      </small>
      <div className="comment">
        <label>
          <textarea required="" rows="1" value={text}></textarea>
          <div>
            <a className="light-button card-icon sm-icon"></a>
            <a className="light-button smiley-icon sm-icon"></a>
            <a className="light-button email-icon sm-icon"></a>
          </div>
          <div>
            <p>You haven&apos;t typed anything!</p>
            <input
              type="submit"
              className="button not-implemented"
              value="Save"
            />
            <i className="x-icon icon"></i>
          </div>
        </label>
      </div>
    </li>
  );
};

export default Comment;