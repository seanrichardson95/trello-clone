import React from "react";

const Label = ({ color, idx, selected, handleToggle }) => {
  return (
    <li key={color}>
      <div className={`${color} colorblindable`} data-id={idx + 1} onClick={handleToggle(color)}>
        {selected ? <i className="check-icon sm-icon"></i> : ""}
      </div>
      <div className={`label-background ${color}`}></div>
      <div className="label-background-overlay"></div>
      <i className="edit-icon icon not-implemented"></i>
    </li>
  );
};

export default Label;