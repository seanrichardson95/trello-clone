import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { editCard } from '../../actions/CardActions';
import COLORS from '../../constants/LabelColors.js';
import Label from './Label';

const LabelsPopover = ({ setIsEditingLabels }) => {
  const cardId = useParams().id;
  const dispatch = useDispatch();
  const currLabels = useSelector(state => state.cards).find(card => card._id === cardId).labels;

  const handleToggle = (color) => {
    return () => {
      let labels = [...currLabels];
      const colorIdx = labels.indexOf(color);
      if (colorIdx > -1) {
        labels.splice(colorIdx, 1);
      } else {
        labels.push(color);
      }
      dispatch(editCard({ card: { labels } }, cardId));
    };
  };

  return (
    <div className="popover labels">
      <div id="add-options-labels-dropdown">
        <header>
          <span>Labels</span>
          <a href="#" className="icon-sm icon-close" onClick={() => setIsEditingLabels(false)}></a>
        </header>
        <div className="content">
          <input
            className="dropdown-input"
            placeholder="Search labels..."
            type="text"
          />
          <div className="labels-search-results">
            <ul className="label-list">
              {COLORS.map((color, idx) => {
                return <Label key={color} color={color} id={idx + 1} selected={currLabels.includes(color)} handleToggle={handleToggle}/>
              })}
            </ul>
            <ul className="light-list">
              <li className="not-implemented">Create a new label</li>
              <hr />
              <li className="toggleColorblind">
                Enable color blind friendly mode.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelsPopover;
