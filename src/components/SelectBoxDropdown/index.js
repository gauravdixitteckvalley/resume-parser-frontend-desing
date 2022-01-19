import React from "react";

const SelectBox = props => {
        return (  
              <select name={ props.name } value={ props.value } onChange={ props.handleStatusChange } className="form-select my-form-select" >
                      {
                         props.dataOptions.map((option) => (
                             <option key={option.value} value={option.value}>{option.label}</option>
                          ))
                       }
                </select>     
        )
    }
export default SelectBox;