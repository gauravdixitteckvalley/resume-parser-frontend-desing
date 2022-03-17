import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

import BlockUI from "../../components/BlockUI";
import { API_URL, displayErrorMessage } from "../../utils/helper";
import { submitResumeData } from "../../actions/Resume";
import "./addResume.css";
import resumeSampleFile from "../../assets/files/resumeSampleFile.docx";

const AddResume = (props) => {
  let fileArray = [];

  /**fetched data from redux store */
  const dispatch = useDispatch();

  /**Max Files Allow */
  const maxUploadFiles = 10;

  const getUploadParams = ({ file }) => {
    if (file.name.match(/\.(pdf|doc|docx)$/)) {
      //match user selected file file
      const body = new FormData();
      body.append("dataFiles", file);
      return { url: `${API_URL}resume`, body };
    } else {
      displayErrorMessage("This file is not allowed!");
      return false;
    }
  };

  const handleChangeStatus = ({ xhr }, status) => {
    if (xhr) {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const result = JSON.parse(xhr.response);
          fileArray.push(result.files[0].filename);
        }
      };
    }
    if (status === "removed") {
      if (fileArray.length > 0) {
        const result = JSON.parse(xhr.response);
        const index = fileArray.indexOf(result.files[0].filename);
        if (index > -1) {
          fileArray.splice(index, 1);
        }
      }
    }
  };

  const handleSubmit = (files, allFiles) => {
    
    dispatch(submitResumeData({ filename: fileArray.toString(), frontendURL: window.location.origin })); // action is called to submit data
    allFiles.forEach((f) => f.remove());
  };

  const blocking = false;

  return (
    <Fragment>
      <BlockUI blocking={blocking} />
      <div className="page-header">
        <h3 className="page-title"> Add Resume</h3>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="add-items row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                  <NavLink to={"/resume/manual/add"}>
                    <button type="button" className="btn btn-gradient-primary btn-fw mb-2" >
                      Manual Upload Resume
                    </button>
                  </NavLink>
                  <Link to={resumeSampleFile} target="_parent" rel="noreferrer">
                    <button type="button" className="btn btn-gradient-primary btn-fw mb-2">
                      Download Sample
                    </button>
                  </Link>
                </div>
              </div>
                <Dropzone
                  getUploadParams={getUploadParams}
                  onChangeStatus={handleChangeStatus}
                  onSubmit={handleSubmit}
                  styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
                  maxFiles={maxUploadFiles}
                  maxSizeBytes={2000000}
                  inputContent={`Drag Files or Click to Browse (Maximum ${maxUploadFiles} files allowed)`}
                />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddResume;
