import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import BlockUI from "../../components/BlockUI"
import { getSingleResumeData } from "../../actions/Resume"
import { API_URL } from '../../utils/helper';
import './CandidatePreview.css'
import { Link } from "react-router-dom";

let base64File = ''
const CandidatePreview = (props) => {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    
    /**fetched data from redux store */
    const resumeData = useSelector(state => state.resume );
    const loggedUser = useSelector(state => state.authenticatedUser);
    const dispatch = useDispatch();

    const { resumeDetails } = resumeData; 
    const { user } = loggedUser;   
    
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

            
    const manageButtonLinkByLoggedIn = (fields) => {
      if(user.isCandidateLogin){
        return (
          <>
            <Link to={`/candidate/details/edit/${user.id}`} rel="noreferrer"><button type="submit" class="btn btn-gradient-primary mb-2">Edit</button></Link>
          </>
        )
        
      }else if(fields.resumePath){
        return (
          <>
            <Link to={`${API_URL}resume/view/${fields.resumePath}`} className="btn btn-primary" target="_blank" rel="noreferrer"><button type="submit" className="btn btn-gradient-primary mb-2">Download</button></Link>
          </>
        )
      }
    }

    //const { blocking } = userData
    const blocking = false;
    
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            
            <div class="page-header">
              <h3 class="page-title"> {user.isCandidateLogin ? 'My Profile' : 'Candidate Preview'}</h3>
              {
                    manageButtonLinkByLoggedIn(fields)
                }
            </div>

            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                      <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Name</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.name || ''}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Email</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.email || ''}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Phone</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.phone || ''}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Skills</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.skills || ''}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>City</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.place || ''}
                            </div>
                        </div>

                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Company Name</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.workExperience || ''}
                            </div>
                         </div>
                         
                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>D.O.B</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.dob || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Address</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.location || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Total Experience</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.exp || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Designation</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.designation || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Current CTC</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.current_ctc || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Expected CTC</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.expected_ctc || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Other Information</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.resume_label || ''}
                            </div>
                         </div>
                         
                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Country</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.country_name || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>State</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.state_name || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Zip Code</b></label>
                            <div className="col-lg-7 col-form-label">
                                    {fields.zip || ''}
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
            </div>



            {/* <div className="display-preview">

            <h1 className="display-4 d-none d-sm-block">
                Candidate Preview &nbsp; &nbsp;
                {
                    fields.resumePath ? (<a href={`${API_URL}resume/view/${fields.resumePath}`}
                    className="btn btn-primary" target="_blank" rel="noreferrer">Download</a>)
                    : ('')
                }
                
            </h1>
                  
                <div className="row clearfix mb-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row clearfix">
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Name</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.name || ''}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Email</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.email || ''}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Phone</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.phone || ''}
                            </div>
                        </div>
                        {
                            fields.skills == null ? (
                            <div className="displayPreviewRow"> 
                                <label className="col-lg-4 col-form-label"><b>S kills</b></label>
                                <div className="col-lg-7 form-group">
                                        {fields.skills || ''}
                                </div>
                            </div>)
                            : ('')
                        } */}
                        
                        {/* {
                            fields.place ? (<div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>City</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.place || ''}
                            </div>
                        </div>)
                            :('')
                        } */}
                        
                        {/* <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>City</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.place || ''}
                            </div>
                        </div>

                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Company Name</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.workExperience || ''}
                            </div>
                         </div>
                         
                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>D.O.B</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.dob || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Address</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.location || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Total Experience</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.exp || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Designation</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.designation || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Current CTC</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.current_ctc || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Expected CTC</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.expected_ctc || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Other Information</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.resume_label || ''}
                            </div>
                         </div>
                         
                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Country</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.country_name || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>State</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.state_name || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Zip Code</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.zip || ''}
                            </div>
                         </div>
                            
                        </div>
                    </div>
                </div>
            </div> */}
        </Fragment>
    )
}

export default CandidatePreview;