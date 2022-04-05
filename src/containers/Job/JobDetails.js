import React,{ useEffect, useState } from 'react';
import _ from 'lodash';
import { NavLink, Link } from "react-router-dom"
import moment from 'moment'

import {getSingleJobData} from  "../../actions/Job";
import { useSelector, useDispatch } from "react-redux";
import BlockUI from "../../components/BlockUI";
import './JobDetails.css';

export default function JobDetails(props) {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    /**fetched data from redux store */
    const jobs = useSelector(state => state.job);
    const loggedUser = useSelector(state => state.authenticatedUser);
    const dispatch = useDispatch();

    const { user } = loggedUser; 
    console.log(user, 'user')

    if(currentId && !_.isEmpty(jobs.jobPostedList)){
        if (_.size(jobs.jobPostedList) !== _.size(fields))
            setFields({...jobs.jobPostedList}) 
        } 
        
    const getJobDetails = async () => {
        dispatch(getSingleJobData(currentId)); 
    }

    useEffect(() => {
        getJobDetails(); // action is called to fetch skills category list
  
      }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const blocking = false;
    return (
        <>
        <BlockUI blocking={blocking} />
        <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body pb-2">
              <h3 className="card-title text-center" style={{fontWeight: '700', fontSize: '23px'}}>Job Details</h3>
              <hr className="mb-4" />
              <div className='row'>
                <div className='col-md-8'>
                    <div className='col-md-12 job-detail mb-3'>
                        <h5 style={{fontWeight:'700'}}>{fields.jobTitle || ""}</h5>
                        <p>Career Developer Consultancy</p>
                        <p>Hiring for Leading Client</p>
                    </div>
                    <div className='col-md-12 icons-list job-details'>
                        <div>
                            <p><i className="mdi mdi-briefcase" aria-hidden="true"></i>{fields.experience || ""}</p>
                            <p><i className="mdi mdi-cash-usd" aria-hidden="true"></i>{fields.salary || ""}</p>
                            <p><i className="mdi mdi-google-maps" aria-hidden="true"></i>{fields.location || ""}</p>
                        </div>
                    </div>
                    
                </div>
                <div className='col-md-4 btn-area'>
                    { user.user_role_name === 'Admin' ?
                   '' : 
                   <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 d-flex">
                   <NavLink to="#" style={{marginRight: '5px'}}>
                       <button type="button" className="btn btn-gradient-primary">Save</button>
                   </NavLink> 
                   <NavLink to="#">
                       <button type="button" className="btn btn-gradient-primary">Apply</button>
                   </NavLink>
               </div> }
                </div>
              </div>
              <hr className="mb-4" />
              <div className='row'>
                <div className='col-md-12 header-btm d-flex'>
                    <p><span>Posted :</span> { (moment().isSame(fields.current_time, 'day'))? moment(fields.current_time).calendar() : moment(fields.current_time).format('MMM DD YYYY')  }</p>
                    <p><span>Number of Openings :</span> {fields.opening || ""}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <div className='row'>
                <div className='col-md-12'>
                    <h6 style={{fontWeight:'700'}}>Job Highlights</h6>
                    <ul className="highlights-ul">
                        <li>{fields.highlights || ""}</li>
                    </ul>
                </div>
                <hr className="mb-4" />
                <div className='col-md-12'>
                    <h6 style={{fontWeight:'700'}}>Job Description</h6>
                    <ul className="highlights-ul">
                        <li>{fields.jd || ""}</li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <div className='row'>
                <div className='col-md-12 pb-4'>
                    <h6 style={{fontWeight:'700'}}>Position</h6>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Role :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.role || ""}</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Industry Type :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.industryType || ""}</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Functional Area :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.functionalArea || ""}</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Employment Type :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.employeeType || ''}</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Role Category :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>Software Engineer</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Key Skills :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.keySkills || "Nill"}</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Other Skills :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.otherSkills || "Nill"}</p>
                        </div>
                    </div>
                </div>
                <hr className="mb-4" />
                <div className='col-md-12 mb-4'>
                    <h6 style={{fontWeight:'700'}}>Education</h6>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Degree :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.education || "Nill"}</p>
                        </div>
                    </div>
                </div>
                <hr className="mb-4" />
                <div className='col-md-12 mb-4'>
                    <h6 style={{fontWeight:'700'}}>Recruiter Details</h6>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Details :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.recruitDetails || "Nill"}</p>
                        </div>
                    </div>
                </div>
                {/* <div className='col-md-12 icons-list social-icons'>
                    <div>
                        <Link to="#"><i className="mdi mdi-facebook-box" aria-hidden="true"></i></Link>
                        <Link to="#"><i className="mdi mdi-linkedin-box" aria-hidden="true"></i></Link>
                        <Link to="#"><i className="mdi mdi-twitter-box" aria-hidden="true"></i></Link>
                    </div>
                    
                </div> */}
              </div>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <div className='row'>
                <div className='col-md-12 pb-4'>
                    <h6 style={{fontWeight:'700'}}>About Company</h6>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Company Name :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.companyName || "Nill"}</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Company Website :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.companyWebsite || "Nill"}</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Company Details :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>{fields.companyDetails || "Nill"}</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      </> 
    )
}