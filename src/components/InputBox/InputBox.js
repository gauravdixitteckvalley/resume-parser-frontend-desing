import React from "react";

const InputBox = ({labelStatus,labelValue,labelClass,labelFor, id, type, name, handleClick, className, value, minLength, maxLength,placeholder,readonly }) => {
    return (
    <>
    {labelStatus ?
    <label className={labelClass} htmlFor={labelFor}>{labelValue}
    </label>
    : ""
    }
        <input type={type ? type : "text"}
        onChange={handleClick}
        className={className ? className : ""}
        value={value ? value : ""}
        minLength={minLength ? minLength :""}
        maxLength={maxLength ? maxLength :""}
        placeholder={placeholder ? placeholder : ""}
        readOnly={readonly?readonly:false}
        name={name ? name  : ''}
        id={id ? id : ""}
        />
      </>
    
  );
};

export default InputBox;

