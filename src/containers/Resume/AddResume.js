import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

import BlockUI from "../../components/BlockUI"
import { API_URL, displayErrorMessage} from '../../utils/helper'
import { submitResumeData,deleteResumeOnRemove } from "../../actions/Resume"
import './addResume.css'
import resumeSampleFile from '../../assets/files/resumeSampleFile.docx';

const AddResume = (props) => {
    let fileArray = [];

    /**fetched data from redux store */
    const dispatch = useDispatch();

    /**Max Files Allow */
    const maxUploadFiles = 10;
    
    const getUploadParams = ({ file }) => {
        if(file.name.match(/\.(pdf|doc|docx)$/)){ //match user selected file file
            const body = new FormData();
            body.append('dataFiles', file);
            return { url: `${API_URL}resume`, body }
        } else {
            displayErrorMessage("This file is not allowed!");
            return false
        }    
    }

    const handleChangeStatus = ({ xhr },status) => {
        if (xhr) {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const result = JSON.parse(xhr.response);
                    fileArray.push(result.files[0].filename);
                    // if(result.status)
                    //     fileArray.push(result.files[0].filename);
                    // else
                    //     displayErrorMessage(result.message);
                }
            }
        }
        if (status === 'removed') {
            if(fileArray.length > 0) {
                
                const result = JSON.parse(xhr.response);
                const index = fileArray.indexOf(result.files[0].filename);
                if (index > -1) {
                    fileArray.splice(index, 1);
                }

                dispatch(deleteResumeOnRemove({"filename": result.files[0].filename }));  // action is called to submit data
            }
        }
    }

    const handleSubmit = (files, allFiles) => {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         "filename": fileArray.toString()
        //     })
        // }

        // fetch(`${API_URL}resume/parse`,requestOptions)
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             history.push('/resume')
        //         },
        //         (error) => {
        //             console.log("error ",error);
        //         }
        //     )

        // if(fileArray.length > 0){
        //     dispatch(submitResumeData({"filename":  fileArray.toString()}));  // action is called to submit data
        //     allFiles.forEach(f => f.remove())
        // }
        // else{
        //     displayErrorMessage('Please select document files');
        // }
        dispatch(submitResumeData({"filename":  fileArray.toString()}));  // action is called to submit data
        allFiles.forEach(f => f.remove())
    }

    //const { blocking } = userData
    const blocking = false;

    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            

            <div className="card mb-4">
                <div className="card-header">
                <div className="row">
                    <div className="col-md-6">
                        <span className=""><strong>Add Resume</strong></span>
                    </div>
                    <div className="col-md-6" style={{"textAlign": "right"}}>
                        <span><NavLink to={'/resume/manual/add'} className="btn btn-primary">Manual Upload Resume</NavLink></span>
                        <span className="" style={{"marginLeft": "10px"}}>
                          <a href={resumeSampleFile}
                                        className="btn btn-success ml-1" target="_parent" rel="noreferrer"
                         >Download Sample</a></span>
                    </div>
                       {/* <span className="col-md-10 float-left"><strong>Add Resume</strong></span> */}
                       
                       {/* <span className="col-md-2 float-right">
                          <a href={resumeSampleFile}
                                        className="btn btn-primary" target="_parent" rel="noreferrer"
                         >Download Sample</a>
                           
                        </span> */}
                    </div>
                    {/* <strong>Resume</strong> 
                    <small>Add</small> */}
                    {/* <div className="row mt-2"> 
                        <div className="col-lg-10">
                            <NavLink to={'/resume/manual/add'} className="btn btn-primary ml-1 mb-2">Manual Upload Resume</NavLink>
                        </div>
                        <div className="col-lg-2 text-right" style={{"textAlign" : "right"}}>
                            <a href={resumeSampleFile} className="btn btn-primary" target="_parent" rel="noreferrer">Download Sample</a>
                        </div>
                    </div> */}
                </div>
                <div className="card-body">
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
        </Fragment>
    )
}

export default AddResume