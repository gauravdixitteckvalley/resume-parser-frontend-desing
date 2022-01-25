import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import BlockUI from "../../components/BlockUI"
import { getSingleResumeData } from "../../actions/Resume"
import { API_URL } from '../../utils/helper';
import './CandidatePreview.css'

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
            <a href={`/candidate/details/edit/${user.id}`} className="btn btn-primary" target="_blank" rel="noreferrer"><button type="submit" class="btn btn-gradient-primary mb-2">Edit</button></a>
          </>
        )
        
      }else if(fields.resumePath){
        return (
          <>
            <a href={`${API_URL}resume/view/${fields.resumePath}`} className="btn btn-primary" target="_blank" rel="noreferrer"><button type="submit" class="btn btn-gradient-primary mb-2">Download</button></a>
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
              <h3 class="page-title"> Candidate Preview</h3>
              {
                    manageButtonLinkByLoggedIn(fields)
                }
            </div>

            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <table class="table">
                          <tbody>
                            <tr>
                              <td><strong>Name</strong></td>
                              <td>{fields.name || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Email</strong></td>
                              <td>{fields.email || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Phone</strong></td>
                              <td>{fields.phone || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Skills</strong></td>
                              <td>{fields.skills || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>City</strong></td>
                              <td>{fields.place || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Company Name</strong></td>
                              <td>{fields.workExperience || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>D.O.B</strong></td>
                              <td>{fields.dob || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Address</strong></td>
                              <td>{fields.location || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Total Experience</strong></td>
                              <td>{fields.exp || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Designation</strong></td>
                              <td>{fields.designation || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Current CTC</strong></td>
                              <td>{fields.current_ctc || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Expected Name</strong></td>
                              <td>{fields.expected_ctc || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Other Information</strong></td>
                              <td>{fields.resume_label || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Country</strong></td>
                              <td>{fields.country_name || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>State</strong></td>
                              <td>{fields.state_name || ''}</td>
                            </tr>
                            <tr>
                              <td><strong>Zip Code</strong></td>
                              <td>{fields.zip || ''}</td>
                            </tr>
                          </tbody>
                        </table>
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