import React from "react";

const Checkbox = ({ id, type, name, handleClick, isChecked,className }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
      className={className}
    />
  );
};

export default Checkbox;
