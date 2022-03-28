import React from 'react';
import _ from 'lodash';
import { NavLink, Link } from "react-router-dom"
import './JobDetails.css';

export default function JobDetails(props) {

    return (
        <>
        <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body pb-2">
              <h3 className="card-title text-center" style={{fontWeight: '700', fontSize: '23px'}}>Job Details</h3>
              <hr className="mb-4" />
              <div className='row'>
                <div className='col-md-8'>
                    <div className='col-md-12 job-detail mb-3'>
                        <h5 style={{fontWeight:'700'}}>Full Stack Architech - MEAN/MERN Stack</h5>
                        <p>Career Developer Consultancy</p>
                        <p>Hiring for Leading Client</p>
                    </div>
                    <div className='col-md-12 icons-list job-details'>
                        <div>
                            <p><i className="mdi mdi-briefcase" aria-hidden="true"></i>12-18 years</p>
                            <p><i className="mdi mdi-cash-usd" aria-hidden="true"></i>Not Disclosed</p>
                            <p><i className="mdi mdi-google-maps" aria-hidden="true"></i>Noida, UP</p>
                        </div>
                    </div>
                    
                </div>
                <div className='col-md-4 btn-area'>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 d-flex">
                        <NavLink to="#" style={{marginRight: '5px'}}>
                            <button type="button" className="btn btn-gradient-primary">Save</button>
                        </NavLink> 
                        <NavLink to="#">
                            <button type="button" className="btn btn-gradient-primary">Apply</button>
                        </NavLink>
                    </div>
                </div>
              </div>
              <hr className="mb-4" />
              <div className='row'>
                <div className='col-md-12 header-btm d-flex'>
                    <p><span>Posted :</span> 3 days ago</p>
                    <p><span>Job Applicants :</span> 12</p>
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
                        <li>Minimum 6+ years of experience in developing apps.</li>
                        <li>Minimum 6+ years of experience in developing apps.</li>
                        <li>Minimum 6+ years of experience in developing apps.</li>
                        <li>Minimum 6+ years of experience in developing apps.</li>
                        <li>Minimum 6+ years of experience in developing apps.</li>
                        <li>Minimum 6+ years of experience in developing apps.</li>
                    </ul>
                </div>
                <hr className="mb-4" />
                <div className='col-md-12'>
                    <h6 style={{fontWeight:'700'}}>Job Description</h6>
                    <ul className="highlights-ul">
                        <li>Minimum 6+ years of experience in developing apps.</li>
                        <li>Minimum 6+ years of experience in developing apps.</li>
                        <li>Minimum 6+ years of experience in developing apps.</li>
                        <li>Minimum 6+ years of experience in developing apps.</li>
                        <li>Minimum 6+ years of experience in developing apps.</li>
                        <li>Minimum 6+ years of experience in developing apps.</li>
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
                            <p>Software Engineer</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Industry Type :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>IT</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Functional Area :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>Software Services</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Employment Type :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>Permanent</p>
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
                </div>
                <hr className="mb-4" />
                <div className='col-md-12 mb-4'>
                    <h6 style={{fontWeight:'700'}}>Education</h6>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">UG :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>BCA in any specialization</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">PG :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>Any Postgraduate</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Doctorate :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>Doctorate not required</p>
                        </div>
                    </div>
                </div>
                <hr className="mb-4" />
                <div className='col-md-12 mb-4'>
                    <h6 style={{fontWeight:'700'}}>Skills</h6>
                    <div className='badges-area'>
                        <span class="badge badge-pill badge-primary">* React</span>
                        <span class="badge badge-pill badge-primary">* Node</span>
                        <span class="badge badge-pill badge-primary">MongoDB</span>
                        <span class="badge badge-pill badge-primary">PHP</span>
                        <span class="badge badge-pill badge-primary">JS</span>
                    </div>
                    <p className='mt-3' style={{fontSize: '14px', color: '#808080bf'}}>Skills highlighted with * are key skills</p>
                </div>
                <hr className="mb-4" />
                <div className='col-md-12 icons-list social-icons'>
                    <div>
                        <Link to="#"><i className="mdi mdi-facebook-box" aria-hidden="true"></i></Link>
                        <Link to="#"><i className="mdi mdi-linkedin-box" aria-hidden="true"></i></Link>
                        <Link to="#"><i className="mdi mdi-twitter-box" aria-hidden="true"></i></Link>
                    </div>
                    
                </div>
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
                            <p>Virtual Employee</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Company Website :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>virtualemployee.in</p>
                        </div>
                    </div>
                    <div className='row position'>
                        <div className='col-md-2'>
                            <p className="label-p">Company Details :</p>
                        </div>
                        <div className='col-md-10'>
                            <p>Virtual Employee (P) Ltd has been providing dedicated virtual employees in any field or profession to small and medium enterprises in over 30 countries.</p>
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