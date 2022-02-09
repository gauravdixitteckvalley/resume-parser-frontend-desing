import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'

import BlockUI from "../../components/BlockUI"
import { history, displayErrorMessage } from '../../utils/helper'
import { getSingleResumeData, fetchResumeData, updateResumeFormData, resetResumeData, getCountryList, getStateList } from "../../actions/Resume"
import validateCandidateDetailsForm from './CandidateDetailsValidation';
import './CandidateDetails.css';
import CandidateMultistepForm from './CandidateMultistepForm';

let base64File = ''
const CandidateDetails = (props) => {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    
    /**fetched data from redux store */
    const resumeData = useSelector(state => state.resume );
    const loggedUser = useSelector(state => state.authenticatedUser);
    const dispatch = useDispatch();

    // const { resumeDetails } = resumeData;    

    const getCandidateDetails = async () => {
        dispatch(getSingleResumeData(currentId));
    }

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        getCandidateDetails();
    }, []);

    if(currentId && typeof resumeData != "undefined" && (_.size(resumeData) > 0))
        if (_.size(resumeData.resumeDetails) !== _.size(fields))
            setFields({...resumeData.resumeDetails})

    /* validate form */
    const _validateForm = () => {
        let formFields = fields;
        let response = validateCandidateDetailsForm(formFields);

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
          
          if(event.target.name === 'country'){
              let countryid = event.target.value;
              dispatch(getStateList(countryid));    
          }
            data[event.target.name] = event.target.value;
            setFields({...data})
        }
    }

    /* submit form */
    const _handleSubmit = (event) => {
        event.preventDefault();
        
        // if (_validateForm()) {
        // }
        const {name, email, phone, skills, place, workExperience, dob, location, exp, designation, current_ctc, expected_ctc, resume_label, country, state, city, zip   } = event.target;
        const postData = {
            name    : name.value,
            email   : email.value,
            phone   : phone.value,
            skills  : skills.value,
            place  : place.value,
            workExperience  : workExperience.value,
            file    : base64File,
            dob     : dob.value, 
            location : location.value, 
            exp     : exp.value, 
            designation : designation.value, 
            current_ctc : current_ctc.value, 
            expected_ctc : expected_ctc.value, 
            resume_label : resume_label.value,
            country : country.value,
            state : state.value,
            zip: zip.value

        }
        console.log('postData',postData);
        postData.loginFor = user.isCandidateLogin ? 'candidate' : ''
        // const postData = new FormData(event.target);
        dispatch(updateResumeFormData(currentId, postData));  // action is called to submit data
    }

    /**method called when form is cancelled */
    const _handleCancelForm = () => {
        history.push('/resume');
    }

    //const { blocking } = userData
    const { blocking, resumeDetails, countryList, stateList } = resumeData; 
    const { user } = loggedUser;
    // const blocking = false;

    const candidateEditPage = (isCandidateLogin) => {
         if(isCandidateLogin === false){
            return (
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <form onSubmit={(event) => _handleSubmit(event)} className="form-inline edit-form">
                          <div className="row">
                              <div className="col-md-6">
                                <label className="mb-1 required" for="inlineFormInputName2">Name</label>
                                <input type="text" name="name" value={fields.name || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="Name" />
                                <div className="errorMsg">{errors.name}</div>  
                              </div>
                              <div className="col-md-6">
                                <label className="mb-1 required" for="inlineFormInputName2">Email</label>
                                <input type="email" name="email" value={fields.email || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="Email" />
                                <div className="errorMsg">{errors.email}</div>  
                              </div>
                          </div>
                          <div className="row mt-2">
                              <div className="col-md-6">
                                <label className="mb-1 required" for="inlineFormInputName2">Phone</label>
                                <input type="text" name="phone" value={fields.phone || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="Phone" />
                                <div className="errorMsg">{errors.phone}</div>   
                              </div>
                              <div className="col-md-6">
                                <label className="mb-1 required" for="inlineFormInputName2">D.O.B</label>
                                <input type="date" name="dob" value={fields.dob || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="City" />
                                <div className="errorMsg">{errors.dob}</div>
                              </div>
                          </div>
                          <div className="row mt-2">
                              <div className="col-md-12">
                                <label className="mb-1" for="inlineFormInputName2">Address</label>
                                <textarea className="form-control" name="location" value={fields.location || ''}  onChange={(event) => _handleChange(event)}></textarea>
                                    <div className="errorMsg">{errors.location}</div>   
                              </div>
                          </div>
                          <div className="row mt-2">
                              <div className="col-md-3">
                                <label className="mb-1 required" for="inlineFormInputName2">Country</label>
                                <select name="country" className="form-control" value={fields.country || ''} 
                                        onChange={(event) => _handleChange(event)} 
                                    >
                                        <option value="">Select Country</option>
                                        {countryList?.map((country, index) => (
                                            <option key={index} value={country._id}>{country.name}</option>
                                        ))}
                                    </select>
                                    <div className="errorMsg">{errors.country}</div>   
                              </div>
                              <div className="col-md-3">
                                <label className="mb-1 required" for="inlineFormInputName2">State</label>
                                <select name="state" className="form-control" value={fields.state || ''} 
                                        onChange={(event) => _handleChange(event)} 
                                    >
                                        <option value="">Select State</option>
                                        {stateList?.map((state, index) => (
                                            <option key={index} value={state._id}>{state.name}</option>
                                        ))}
                                    </select>
                                    <div className="errorMsg">{errors.state}</div>  
                              </div>
                              <div className="col-md-3">
                                <label className="mb-1 required" for="inlineFormInputName2">City</label>
                                <input type="text" name="place" value={fields.place || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="City" />
                                    <div className="errorMsg">{errors.city}</div>  
                              </div>
                              <div className="col-md-3">
                                <label className="mb-1 required" for="inlineFormInputName2">Zip</label>
                                <input type="text" name="zip" value={fields.zip || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="Zip" />
                                    <div className="errorMsg">{errors.zip}</div>  
                              </div>
                          </div>
                          <div className="row mt-2">
                              <div className="col-md-6">
                                <label className="mb-1 required" for="inlineFormInputName2">Company Name</label>
                                <input type="text" name="workExperience" value={fields.workExperience || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="Company Name" />
                                <div className="errorMsg">{errors.workExperience}</div> 
                              </div>
                              <div className="col-md-6">
                                <label className="mb-1 required" for="inlineFormInputName2">Skills</label>
                                <input type="text" name="skills" value={fields.skills || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="HTML,CSS,PHP,.NET,JAVASCRIPT" />
                                <div className="errorMsg">{errors.skills}</div>   
                              </div>
                          </div>
                          <div className="row mt-2">
                              <div className="col-md-6">
                                <label className="mb-1 required" for="inlineFormInputName2">Total Experience</label>
                                <input type="text"  pattern="[+-]?\d+(?:[.,]\d{1}+)?" name="exp" value={fields.exp || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="Total Experience" />
                                <div className="errorMsg">{errors.exp}</div>
                              </div>
                              <div className="col-md-6">
                                <label className="mb-1 required" for="inlineFormInputName2">Designation</label>
                                <input type="text" name="designation" value={fields.designation || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="Designation" />
                                <div className="errorMsg">{errors.designation}</div>
                              </div>
                          </div>
                          <div className="row mt-2">
                              <div className="col-md-6">
                                <label className="mb-1 required" for="inlineFormInputName2">Current CTC</label>
                                <input type="text" name="current_ctc" value={fields.current_ctc || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="Current CTC" />
                                <div className="errorMsg">{errors.current_ctc}</div>
                              </div>
                              <div className="col-md-6">
                                <label className="mb-1" for="inlineFormInputName2">Expected CTC</label>
                                <input type="text" name="expected_ctc" value={fields.expected_ctc || ''} onChange={(event) => _handleChange(event)} className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="Expected CTC" />
                                <div className="errorMsg">{errors.expected_ctc}</div>
                              </div>
                          </div>
                          <div className="row mt-2 mb-4">
                              <div className="col-md-6">
                                <label className="mb-1 required" for="inlineFormInputName2">Other Information</label>
                                <textarea className="form-control" name="resume_label" cols="30" rows="3" 
                                     value={fields.resume_label || ''} 
                                    onChange={(event) => _handleChange(event)}></textarea>
                                    <div className="errorMsg">{errors.resume_label}</div>
                              </div>
                              <div className="col-md-6 mb-3">
                                <label for="formFile" className="form-label required">Resume</label>
                                <input name="document" onChange={(event) => _handleChange(event)} className="form-control" type="file" id="formFile" />
                              </div>
                          </div>
                          
                          <button type="submit" className="btn btn-gradient-primary mb-2">Submit</button>
                          <button onClick={_handleCancelForm} className="btn btn-light mb-2" style={{marginLeft: '10px'}}>Cancel</button>
                        </form>
                      </div>
                    </div>
                  </div>
            </div>
            )
        } else {
            return (
                <CandidateMultistepForm />
            )
        }
    }

    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <div className="page-header">
              <h3 className="page-title"> Update Details</h3>
            </div>

            {candidateEditPage(user.isCandidateLogin)}
                
        </Fragment>
    )
}

export default CandidateDetails;