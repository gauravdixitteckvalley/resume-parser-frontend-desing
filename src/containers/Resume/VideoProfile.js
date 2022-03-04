import React, { Fragment, useState } from "react"
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import BlockUI from "../../components/BlockUI"
import { history, displayErrorMessage } from '../../utils/helper'
import { submitVideoProfileAction } from '../../actions/Candidate'
import './CareerPreference.css';

let base64File = ''
const VideoProfile = (props) => {

  //get url id
  const { id : candidateId} = props.match.params

  //use selector to get candidate store data
  const candidate = useSelector(state => state.candidate );

  //fetch user from redux store
  const loggedUser = useSelector(state => state.authenticatedUser);
  const { user } = loggedUser;

  //dispatch function to execute the action
  const dispatch = useDispatch();

  const _handleChange = event => {
    event.preventDefault()
    const videoFile = event.target.files[0];
  
      if (!videoFile) {
          displayErrorMessage('Please select file');
          return false;
      }
  
      if(!videoFile.name.match(/\.(mp4|mp3)$/)){ //match user selected file file
          displayErrorMessage('Please select mp4 or mp3 only ');
          return false;
      }

      if(videoFile.size > 3213740){    //3mb file size
        displayErrorMessage('Please select file upto 3MB');
        return false
      }

      let reader = new FileReader();
      reader.onload = () => {
          base64File = reader.result; //passing user file source in fileURL variable
      }
      reader.readAsDataURL(videoFile);
  }

  const onSubmitVideoProfile = (event) => {
    event.preventDefault()
    const postData = new FormData(event.target);
    postData.append('form', 'videoProfileCandidate');
    dispatch(submitVideoProfileAction(candidateId, postData))
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
                      <h4 className="page-title font-style-bold">Video Profile</h4>
                  </div>
                  <div className="col-md-2 col-md-2">
                      <Link to={user.isCandidateLogin ? `/candidate/view/${candidateId}` : `/candidate/preview/${candidateId}`} rel="noreferrer" className="p-0">
                          <button type="submit" className="btn btn-gradient-primary">Back</button>
                      </Link>
                  </div>
              </div>
              <p style={{ fontSize: "13px" }}>
                List your work experience, from the most recent to the oldest.
                Feel free to use out pre-written examples.
              </p>
              <hr className="mb-4" />

              <Form onSubmit={ event => onSubmitVideoProfile(event) } className="form-inline edit-form">
                <div className="row mt-2">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="formFile" className="form-label required">Upload video</label>
                    <input
                      name="videoProfile"
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={ event => _handleChange(event) }
                    />
                  </div>

                </div>
                <button
                  type="submit"
                  className="btn btn-gradient-primary mt-4 mb-2"
                >
                  Submit
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default VideoProfile