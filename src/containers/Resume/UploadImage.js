import React, { Fragment, useState } from "react"
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileImage } from '../../actions/Candidate';

import BlockUI from "../../components/BlockUI"

const UploadImage = (props) => {

    const [fields,setFields] = useState();
    const [fileName,setFileName] =useState("")
    let id = props.match.params.id;
    //console.log(props)
    const [error,setError] = useState("");

  const candidate = useSelector(state => state.candidate );
  const dispatch = useDispatch();
  //dispatch function to execute the action

  const _validateForm = () => {
    let formFields = fields;
    let formIsValid = true;
        if(!formFields){
            formIsValid = false;
            setError("*Please upload  file")
        }
        else if (!formFields.match(/\.(jpg|png|jpeg)$/)) {
            formIsValid = false;
            setError("*Please upload .jpg/.png/.jpeg")
            
        }else{
            setError(" ")
        }
    
        return formIsValid;
    
    
  };

  const _handleChange = event => {
    const { name, value } = event.target;
        //console.log("event.target ",event.target.files[0])
        setFileName(event.target.files[0])
        setFields(value);
        console.log(value);
  }

  const _handleSubmitImage = (event) => {
    event.preventDefault()
    if (_validateForm()) {
        let postData = new FormData(event.target)
    
        if(id){
            dispatch(updateProfileImage(id,postData));
        }
        console.log(postData);
    } 
  }

  const { blocking } = candidate;
  return (
    <Fragment>
      <BlockUI blocking={blocking} />
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="page-title font-style-bold mb-2">
                Upload Profile Image
              </h4>
              <hr className="mb-4" />

              <Form onSubmit={(event) => _handleSubmitImage(event)} className="form-inline edit-form">
                <div className="row mt-2">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="formFile" className="form-label required">Upload Image</label>
                    <input
                      name="profileImage"
                      className="form-control"
                      type="file"
                      id="profileImage"
                      onChange={(event) => _handleChange(event) }
                    />
                    <div className="errorMsg">{error ? error  : ""}</div>
                  </div>

                </div>
                <button type="submit" className="btn btn-gradient-primary mb-2">Submit</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UploadImage