import React, { Fragment, useState } from "react"
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileImage } from '../../actions/Candidate';
import { Link } from "react-router-dom";

import BlockUI from "../../components/BlockUI"
import './CareerPreference.css';

const UploadImage = (props) => {

    const [fields,setFields] = useState();
    const [fileName,setFileName] =useState("")
    let id = props.match.params.id;
    const [error,setError] = useState("");

    //get url id
  const { id : candidateId} = props.match.params

     //fetch user from redux store
  const loggedUser = useSelector(state => state.authenticatedUser);
  const { user } = loggedUser;

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
        setFileName(event.target.files[0])
        setFields(value);
  }

  const _handleSubmitImage = (event) => {
    event.preventDefault()
    if (_validateForm()) {
        let postData = new FormData(event.target)
    
        if(id){
            dispatch(updateProfileImage(id,postData));
        }
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
              <div className="row back-btn">
                  <div className="col-md-10 col-sm-12">
                      <h4 className="page-title font-style-bold">Upload Profile Image</h4>
                  </div>
                  <div className="col-md-2 col-md-2">
                      <Link to={user.isCandidateLogin ? `/candidate/view/${candidateId}` : `/candidate/preview/${candidateId}`} rel="noreferrer" className="p-0">
                          <button type="submit" className="btn btn-gradient-primary mb-4">Back</button>
                      </Link>
                  </div>
              </div>
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