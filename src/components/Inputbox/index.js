import React from "react";

const InputBox = ({InputValue, handleClick})=>{
    // const { InputValue } = props;
    
    return( 
        <input type="text"
            className="form-control mb-2 mr-sm-2"
            value = {InputValue || ''}
            onChange={handleClick}
            name="skill"
        />
        
    )
}

export default InputBox;