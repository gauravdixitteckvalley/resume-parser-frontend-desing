import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import BlockUI from "../../components/BlockUI"
import { getSingleResumeData } from "../../actions/Resume"
import { API_URL } from '../../utils/helper';
import './CandidatePreview.css'
import { Link,NavLink } from "react-router-dom";

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
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-end text-right candid-profile">
              <Link to={`/candidate/view/career-preference/${user.id}`} rel="noreferrer">
                <button type="submit" className="btn btn-gradient-primary mb-2">Career preference</button>
              </Link>
              <Link to={`/candidate/view/video-profile/${user.id}`} rel="noreferrer">
                <button type="submit" className="btn btn-gradient-primary mb-2">Video profile</button>
              </Link>
              <Link to={`/candidate/details/edit/${user.id}`} rel="noreferrer">
                <button type="submit" className="btn btn-gradient-primary mb-2">Edit</button>
              </Link>
            </div>
          </>
        )
        
      }else if(fields.resumePath){
        return (
          <>
            <a href={`${API_URL}resume/view/${fields.resumePath}`} target="_blank" rel="noreferrer"><button type="button" className="btn btn-gradient-primary mb-2">Download</button></a>
          </>
        )
      }
    }

    //const { blocking } = userData
    const blocking = false;
   
    return (
      <Fragment>
        <BlockUI blocking={blocking} />
        <div className="page-header">
          <h3 className="page-title">
            {" "}
            {user.isCandidateLogin ? "My Profile" : "Candidate Preview"}
          </h3>
          {manageButtonLinkByLoggedIn(fields)}
        </div>

        {/* <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Name</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.name || ""}
                  </div>
                </div>
                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Email</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.email || ""}
                  </div>
                </div>
                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Phone</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.phone || ""}
                  </div>
                </div>
                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Skills</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.skills?.map((skill, index) => (
                      <span key={index}>
                        {skill.hasOwnProperty("skill") ? skill.skill : skill}{" "}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>City</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.place || ""}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Company Name</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.workExperience?.map((company, index) => (
                      <span key={index}>
                        {company.hasOwnProperty("employer")
                          ? company.employer
                          : company}{" "}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>D.O.B</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.dob || ""}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Address</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.location || ""}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Total Experience</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.exp || ""}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Designation</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.designation || ""}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Current CTC</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.current_ctc || ""}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Expected CTC</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.expected_ctc || ""}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Other Information</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.resume_label || ""}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Country</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.country_name || ""}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>State</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.state_name || ""}
                  </div>
                </div>

                <div className="displayPreviewRow">
                  <label className="col-lg-4 col-form-label">
                    <b>Zip Code</b>
                  </label>
                  <div className="col-lg-7 col-form-label">
                    {fields.zip || ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="page-title font-style-bold mb-4">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-checkbox-marked"></i>
                  </span>
                  PERSONAL INFO
                </h4>
                <hr className="mb-4" />

                <div className="row">
                  <div className="displayPreviewRow col-md-12">
                    <label className="col-lg-4 col-form-label">
                      <b>Name</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.name || ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-12">
                    <label className="col-lg-4 col-form-label">
                      <b>Address</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.location || ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-4">
                    <label className="col-lg-4 col-form-label">
                      <b>City</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.place || ""}
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-4">
                    <label className="col-lg-4 col-form-label">
                      <b>Zip</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.zip || ""}
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-4">
                    <label className="col-lg-4 col-form-label">
                      <b>Country</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.country_name || ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Email Address</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.email || ""}
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Phone</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.phone || ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h3 className="page-title font-style-bold mb-4">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-checkbox-marked"></i>
                  </span>
                  EXPERIENCE
                </h3>
                <hr className="mb-4" />
                {/* {fields.workExperience?.map((company, index) => ( */}
                  <>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Employer</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.workExperience?.map((company, index) => ( console.log('company',company) 
                        // <span key={index}>
                        //   {company.hasOwnProperty("employer")
                        //     ? company.employer
                        //     : company }{" "}
                        //   <br />
                        // </span>
                      ))}
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Job Title</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.designation || ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>City</b>
                    </label>
                    <div className="col-lg-7 col-form-label">Noida</div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>State</b>
                    </label>
                    <div className="col-lg-7 col-form-label">UP</div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Start Date</b>
                    </label>
                    <div className="col-lg-7 col-form-label">12/05/2021</div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>End Date</b>
                    </label>
                    <div className="col-lg-7 col-form-label">12/05/2021</div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-12">
                    <label className="col-lg-4 col-form-label">
                      <b>Job Description</b>
                    </label>
                    <div className="col-lg-7 col-form-label">This is just a test</div>
                  </div>
                </div>
                </>
                 {/* ))} */}
              </div>
            </div>
          </div>
        </div>
        
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h3 className="page-title font-style-bold mb-4">
                    <span className="page-title-icon bg-gradient-primary text-white me-2">
                      <i className="mdi mdi-checkbox-marked"></i>
                    </span>
                    EDUCATION
                  </h3>
                  <hr className="mb-4" />

                  <div className="row">
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>School Name</b>
                      </label>
                      <div className="col-lg-7 col-form-label">
                        xyz
                      </div>
                    </div>
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>City</b>
                      </label>
                      <div className="col-lg-7 col-form-label">
                        noida
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>State</b>
                      </label>
                      <div className="col-lg-7 col-form-label">UP</div>
                    </div>
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>Degree</b>
                      </label>
                      <div className="col-lg-7 col-form-label">BCA</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>Field of study</b>
                      </label>
                      <div className="col-lg-7 col-form-label">CS</div>
                    </div>
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>Graduation Date</b>
                      </label>
                      <div className="col-lg-7 col-form-label">2014</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h3 className="page-title font-style-bold mb-4">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-checkbox-marked"></i>
                  </span>
                  SKILLS
                </h3>
                <hr className="mb-4" />
                {fields.skills?.map((index,key) => (
                <div className="row" key={`${key}`}>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Skill</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {index.skill}
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Level</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {index.skillLevel}
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h3 className="page-title font-style-bold mb-4">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-checkbox-marked"></i>
                  </span>
                  LANGUAGES
                </h3>
                <hr className="mb-4" />  
                {fields.langauge?.map((index,key) => (
                    <div className="row" key={`${key}`}>
                      <div className="displayPreviewRow col-md-6">
                        <label className="col-lg-4 col-form-label">
                          <b>Language</b>
                        </label>
                        <div className="col-lg-7 col-form-label">
                          {index.language}
                        </div>
                      </div>
                      <div className="displayPreviewRow col-md-6">
                        <label className="col-lg-4 col-form-label">
                          <b>Level</b>
                        </label>
                        <div className="col-lg-7 col-form-label">
                          {index.langLevel}
                        </div>
                      </div>
                    </div> 
                ))}
                {console.log(fields)}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h3 className="page-title font-style-bold mb-4">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-checkbox-marked"></i>
                  </span>
                  AWARDS & PUBLICATIONS
                </h3>
                <hr className="mb-4" />

                <div className="row">
                  <div className="displayPreviewRow col-md-12">
                    <label className="col-lg-4 col-form-label">
                      <b>Awards</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                    {fields.award || ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-12">
                    <label className="col-lg-4 col-form-label">
                      <b>Publications</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                        {fields.publication || ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h3 className="page-title font-style-bold mb-4">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-checkbox-marked"></i>
                  </span>
                  ACCOMPLISHMENTS
                </h3>
                <hr className="mb-4" />

                <div className="row">
                  <div className="displayPreviewRow col-md-12">
                    <label className="col-lg-4 col-form-label">
                      <b>Accomplishments</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.accomplishment || ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-12">
                    <label className="col-lg-4 col-form-label">
                      <b>Additional information</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {fields.additional_info || ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
}

export default CandidatePreview;