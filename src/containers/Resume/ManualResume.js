import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'

import BlockUI from "../../components/BlockUI"
import { history, displayErrorMessage } from '../../utils/helper'
import { submitManualResumeFormData, resetResumeData } from "../../actions/Resume"
import validateManualResumeForm from './ManualResumeValidation'

let base64File = ''
const ManualResume = (props) => {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    
    /**fetched data from redux store */
    const resumeData = useSelector(state => state.resume);
    const dispatch = useDispatch();

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        // returned function will be called on component unmount 
        return () => {
            dispatch(resetResumeData())
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    /* validate form */
    const _validateForm = () => {
        let formFields = fields;
        let response = validateManualResumeForm(formFields);

        setErrors(response.errors)
        return response.formIsValid;
    }

    /* handle input field changes */
    const _handleChange = (event) => {
        let data = fields;
        
        if(event.target.name === "document") {
            const imageFile = event.target.files[0];
        
            if (!imageFile) {
                displayErrorMessage('Please select file');
                return false;
            }
        
            if(!imageFile.name.match(/\.(pdf|doc|docx)$/)){ //match user selected file file
                displayErrorMessage('Please select doc, docx or pdf only ');
                return false;
            }

            let reader = new FileReader();
            reader.onload = () => {
                base64File = reader.result; //passing user file source in fileURL variable
            }
            reader.readAsDataURL(imageFile);
        } else {
            data[event.target.name] = event.target.value;
            setFields({...data})
        }
    }

    /* submit form */
    const _handleSubmit = (event) => {
        event.preventDefault();
        
        if (_validateForm()) {
            // const {name, email, phone, skills} = event.target;
            // const postData = {
            //     name    : name.value,
            //     email   : email.value,
            //     phone   : phone.value,
            //     skills  : skills.value,
            //     file    : base64File
            // }

            const postData = new FormData(event.target);
            dispatch(submitManualResumeFormData(postData));  // action is called to submit data
        }
    }

    /**method called when form is cancelled */
    const _handleCancelForm = () => {
        history.push('/resume')
    }

    //const { blocking } = userData
    const blocking = false;

    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <h1 className="display-4 d-none d-sm-block">
                Manual Add Resume
            </h1>

            <form onSubmit={(event) => _handleSubmit(event)}>
                <div className="row clearfix mb-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row clearfix">
                            <div className="col-md-6 mb-3"> <b className="required">Name</b>
                                <div className="form-group">
                                    <input type="text" name="name" className="form-control"
                                            placeholder="Martin Philipes" 
                                            value={fields.name || ''} 
                                            onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.name}</div>        
                                </div>
                            </div>

                            <div className="col-md-6 mb-3"> <b className="required">Email</b>
                                <div className="form-group">
                                    <input type="email" name="email" className="form-control"
                                            placeholder="dummy@faker.com" 
                                            value={fields.email || ''}
                                            onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.email}</div>        
                                </div>
                            </div>

                            <div className="col-md-6 mb-3"> <b className="required">Phone</b>
                                <div className="form-group">
                                    <input type="text" name="phone" className="form-control" 
                                            placeholder="+91 1232222124"
                                            value={fields.phone || ''}
                                            onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.phone}</div>        
                                </div>
                            </div>

                            <div className="col-md-6 mb-3"> <b className="required">Skills</b>
                                <div className="form-group">
                                    <input type="text" name="skills" className="form-control" 
                                            placeholder="HTML,CSS,PHP,.NET,JAVASCRIPT"
                                            value={fields.skills || ''}
                                            onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.skills}</div>        
                                </div>
                            </div>

                            <div className="col-md-6 mb-3"> <b className="required">City</b>
                                <div className="form-group">
                                    <input type="text" name="place" className="form-control"
                                            placeholder="City" 
                                            value={fields.place || ''} 
                                            onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.place}</div>        
                                </div>
                            </div>
                            <div className="col-md-6 mb-3"> <b className="required">Company Name</b>
                                <div className="form-group">
                                    <input type="text" name="workExperience" className="form-control"
                                            placeholder="Company name" 
                                            value={fields.workExperience || ''} 
                                            onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.workExperience}</div>        
                                </div>
                            </div>
                            
                            <div className="col-md-6 mb-3"> <b className="required">D.O.B</b>
                                <div className="form-group">
                                    <input className="form-control" type="date" name="dob" 
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.dob}</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3"> Place/Location
                                <div className="form-group">
                                    <input className="form-control" type="text" name="location" 
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.location}</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3"> <b className="required">Total Experience</b>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="exp" 
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.exp}</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3"> <b className="required">Designation</b>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="designation" 
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.designation}</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3"> <b className="required">Current CTC</b>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="current_ctc" 
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.current_ctc}</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3"> Expected CTC
                                <div className="form-group">
                                    <input className="form-control" type="text" name="expected_ctc" 
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <div className="errorMsg">{errors.expected_ctc}</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3"> Resume Lable
                                <div className="form-group">
                                    <textarea className="form-control" name="resume_label" cols="30" rows="3" onChange={(event) => _handleChange(event)}></textarea>
                                    <div className="errorMsg">{errors.resume_label}</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3"> <b className="required">Resume</b>
                                <div className="form-group">
                                    <input className="fileInput" type="file" name="document" 
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                    
                <button type="submit" className="btn btn-success">Submit</button>
                <button className="btn btn-danger ms-2" onClick={_handleCancelForm}>Cancel</button>
            </form>
        </Fragment>
    )
}

export default ManualResume