import React from "react";

const Inputbox = ({labelStatus,labelValue,labelClass,labelFor, id, type, name, handleClick, className, value, minLength, maxLength,placeholder,readonly }) => {
  return (
    <>
        {labelStatus ? 
            <label className={labelClass} htmlFor={labelFor}>
                {labelValue}
            </label>
            : ""
        }
        
        <input
            id={id ? id : ""}
            name={name ? name : ""}
            type={type}
            onChange={handleClick}
            className={className ? className : ""}
            value={value ? value : ""}
            minLength={minLength ? minLength :""}
            maxLength={maxLength ? maxLength :""}
            placeholder={placeholder ? placeholder : ""}
            readOnly={readonly?readonly:false}
        />
    </>
    
  );
};

export default Inputbox;