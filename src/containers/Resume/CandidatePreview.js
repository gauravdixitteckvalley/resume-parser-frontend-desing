import React, { Fragment, useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { Link, NavLink } from "react-router-dom";
import VideoPlayer from 'react-video-js-player';

import BlockUI from "../../components/BlockUI"
import { getSingleResumeData } from "../../actions/Resume"
import { API_URL } from '../../utils/helper';
import './CandidatePreview.css'

const CandidatePreview = (props) => {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    const resumeDataList = useSelector(state => state.resume );
    const { countryList } = resumeDataList;

    /**fetched data from redux store */
    const resumeData = useSelector(state => state.resume );
    const loggedUser = useSelector(state => state.authenticatedUser);
    const dispatch = useDispatch();

    const { user } = loggedUser;
    
    if(currentId && typeof resumeData != "undefined" && (_.size(resumeData) > 0))
    if (_.size(resumeData.resumeDetails) !== _.size(fields))
        setFields({...resumeData.resumeDetails})   
    
    const getCandidateDetails = async () => {
        dispatch(getSingleResumeData(currentId));
    }

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        getCandidateDetails();
    }, []);


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

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="page-title font-style-bold mb-4">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-checkbox-marked"></i>
                  </span>
                  CAREER PREFERENCE
                </h4>
                <hr className="mb-4" />

                { fields?.careerPreference ? 
                (
                <>
                  <div className="row">
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>Preferred Location</b>
                      </label>
                      <div className="col-lg-7 col-form-label">
                        {fields.careerPreference.dvelopempreferredLoc || ""}
                      </div>
                    </div>
                    <div className="displayPrevdhhoodctbbfiewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>Preferred Role</b>
                      </label>
                      <div className="col-lg-7 col-form-label">
                        {fields.careerPreference.preferredRole || ""}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>Preferred Salary</b>
                      </label>
                      <div className="col-lg-7 col-form-label">
                        {fields.careerPreference.preferredSal || ""}
                      </div>
                    </div>
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>Preferred Shift</b>
                      </label>
                      <div className="col-lg-7 col-form-label">
                        {fields.careerPreference.preferredShift || ""}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>Job Type</b>
                      </label>
                      <div className="col-lg-7 col-form-label">
                        {fields.careerPreference.jobType.join(",") || ""}
                      </div>
                    </div>
                    <div className="displayPreviewRow col-md-6">
                      <label className="col-lg-4 col-form-label">
                        <b>Employement Type</b>
                      </label>
                      <div className="col-lg-7 col-form-label">
                        {fields.careerPreference.empType.join(",") || ""}
                      </div>
                    </div>
                  </div>
                </> )
                
              : ''}
                
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="page-title font-style-bold mb-4">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-checkbox-marked"></i>
                  </span>
                  VIDEO PROFILE
                </h4>
                <hr className="mb-4" />

                { fields?.videoProfile ? 
              (
              <>
                <div className="row">
                  <div className="displayPreviewRow col-md-12">
                    <div className="col-lg-7 col-form-label">
                      <VideoPlayer
                          controls={true}
                          src={fields.videoProfile}
                          poster={fields.videoProfile}
                          width="720"
                          height="420"
                      /> 
                    </div>
                  </div>
                </div>
              </> )
                
                : ''}
                
              </div>
            </div>
          </div>
        </div>
        
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
                    {countryList?.map((country, index) => (
                            <span>{country._id == fields?.country ? country.name :" " }</span>
                        ))}
                      
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
                  <div className="displayPdreviewRow col-md-6">
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
                {fields.workExperience?.map((company, index) => (
                  <>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Employer</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {/* {fields.workExperience?.map((company, index) => ( console.log('company',company)  */}
                         <span key={index}>
                           {company.hasOwnProperty("employer")
                            ? company.employer
                             : company }{" "}
                           <br />
                         </span>
                       {/* ))} */}
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Job Title</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {company.hasOwnProperty("employer")
                            ? company.emptitle
                             : company }{" "}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>State</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                    
                        {company.hasOwnProperty("employer")
                            ?  company[`state${index}`]
                             : company }{" "}
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>City</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {company.hasOwnProperty("employer")
                            ? company.city
                             : company }{" "}
                    </div>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Start Date</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {company.hasOwnProperty("employer")
                            ? company.startDate
                             : company }{" "}
                    </div>
                  </div>
                  {company.hasOwnProperty("employer")
                            ? company.endDate ? 
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>End Date</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      { company.endDate}
                             
                    </div>
                  </div>
                  :company.currentWork ? 
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>Present Date</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                     Currently working 
                             
                    </div>
                  </div>
                  :
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-4 col-form-label">
                      <b>End Date</b>
                    </label>
                  </div>
                  : company }{" "}
                </div>
                <div className="row" >
                  <div className="displayPreviewRow col-md-12" style={{borderBottom: '0'}}>
                    <label className="col-lg-4 col-form-label">
                      <b>Job Description</b>
                    </label>
                    <div className="col-lg-7 col-form-label">
                      {company.hasOwnProperty("employer")
                            ? company.jd
                             : company }{" "}
                    </div>
                  </div>
                </div>
                <hr className="mb-4" />
                </>
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
                  EDUCATION
                </h3>
                <hr className="mb-4" />
                {fields.education?.map((edu, key) => (
                  <>
                    <div className="row">
                      <div className="displayPreviewRow col-md-6">
                        <label className="col-lg-12 col-form-label">
                          <b>College / School Name</b>
                        </label>
                        <div className="col-lg-12 col-form-label">
                          {edu?.schoolOrCollege}
                        {/* {edu.hasOwnProperty("education")
                              ? edu.schoolOrCollege
                              : edu }{" "} */}
                        </div>
                      </div>
                      <div className="displayPreviewRow col-md-6">
                        <label className="col-lg-4 col-form-label">
                          <b>City</b>
                        </label>
                        <div className="col-lg-7 col-form-label">
                          {edu?.city}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="displayPreviewRow col-md-6">
                        <label className="col-lg-4 col-form-label">
                          <b>State</b>
                        </label>
                        <div className="col-lg-7 col-form-label">
                          { edu[`state${key}`]}
                        </div>
                      </div>
                      <div className="displayPreviewRow col-md-6">
                        <label className="col-lg-4 col-form-label">
                          <b>Degree</b>
                        </label>
                        <div className="col-lg-7 col-form-label">
                          {edu?.degree}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="displayPreviewRow col-md-6" style={{borderBottom: '0'}}>
                        <label className="col-lg-4 col-form-label">
                          <b>Field of study</b>
                        </label>
                        <div className="col-lg-7 col-form-label">{edu.studyField}</div>
                      </div>
                      <div className="displayPreviewRow col-md-6" style={{borderBottom: '0'}}>
                        <label className="col-lg-4 col-form-label">
                          <b>Graduation Date</b>
                        </label>
                        <div className="col-lg-7 col-form-label">
                          {edu?.presentAttend ? "Present Study ":
                            <>
                              {edu?.gradMonth} {edu?.gradYear}
                            </>
                          }
                          
                          
                          </div>
                      </div>
                    </div>
                    <hr className="mb-4" />
                  </>
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
                  SKILLS
                </h3>
                <hr className="mb-4" />
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-12 col-form-label">
                      <b>Skill</b>
                    </label>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-12 col-form-label">
                      <b>Level</b>
                    </label>
                  </div>
                </div>
                {fields.skills?.map((index,key) => (
                  <div className="row" key={`${key}`}>
                    <div className="displayPreviewRow col-md-6">
                      <div className="col-lg-12 col-form-label">
                        {index.skill}
                      </div>
                    </div>
                    <div className="displayPreviewRow col-md-6">
                      <div className="col-lg-12 col-form-label">
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
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-12 col-form-label">
                      <b>Language</b>
                    </label>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-12 col-form-label">
                      <b>Level</b>
                    </label>
                  </div>
                </div>  
                {fields.langauge?.map((index,key) => (
                  <div className="row" key={`${key}`}>
                    <div className="displayPreviewRow col-md-6">
                      <div className="col-lg-12 col-form-label">
                        {index.language}
                      </div>
                    </div>
                    <div className="displayPreviewRow col-md-6">
                      <div className="col-lg-12 col-form-label">
                        {index.langLevel}
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