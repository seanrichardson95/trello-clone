import React from 'react';
import { useSelector } from "react-redux";
import Comment from './Comment';

const ActivitySection = () => {
  const comments = useSelector(state => state.comments);

  return (
    <li className="activity-section">
      <h2 className="activity-icon icon">Activity</h2>
      <ul className="horiz-list">
        <li className="not-implemented">Show Details</li>
      </ul>
      <ul className="modal-activity-list">
      {comments.map(comment => <Comment key={comment._id} text={comment.text} createdAt={comment.createdAt} />)}
      <li>
          <div className="member-container">
            <div className="card-member small-size">VR</div>
          </div>
          <p>
            <span className="member-name">Victor Reyes</span> changed the
            background of this board <small>yesterday at 4:53 PM</small>
          </p>
        </li>
      </ul>
    </li>
  );
};

export default ActivitySection;