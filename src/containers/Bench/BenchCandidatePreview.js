import React, { useState } from 'react';
import _ from 'lodash';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './BenchCandidatePreview.css'

export default function BenchCandidateList(props) {
    
    const location = useLocation(); 
    console.log('props',location.benchProps);
    return (
        <>
        <div className="page-header">
          <div className="export-btn template-demo ml-auto mb-0">
              <Link to={`/bench-candidate-list`} rel="noreferrer">
                <button  className="btn btn-gradient-primary">Back</button>
              </Link>
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
                  Candidate Details
                </h4>
                <hr className="mb-4" />

                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-form-label">
                      <b>Name</b>
                    </label>
                    <div className="col-form-label">
                      { location.benchProps?.employee_name }
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-form-label">
                      <b>Email</b>
                    </label>
                    <div className="col-form-label">
                    { location.benchProps?.employee_email }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-12 col-form-label">
                      <b>Designation</b>
                    </label>
                    <div className="col-lg-12 col-form-label">
                    { location.benchProps?.employee_title }
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-12 col-form-label">
                      <b>Skills</b>
                    </label>
                    <div className="col-lg-12 col-form-label">
                    { location.benchProps?.employee_skill }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-form-label">
                      <b>Team Leader</b>
                    </label>
                    <div className="col-form-label">
                    { location.benchProps?.employee_tl }
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-form-label">
                      <b>Emp. Code</b>
                    </label>
                    <div className="col-form-label">
                    { location.benchProps?.employee_code }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-form-label">
                      <b>Experience</b>
                    </label>
                    <div className="col-form-label">
                    { location.benchProps?.employee_experience }
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-12 col-form-label">
                      <b>Joining Date</b>
                    </label>
                    <div className="col-lg-12 col-form-label">
                    { location.benchProps?.joinig_date }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-form-label">
                      <b>Status</b>
                    </label>
                    <div className="col-form-label">
                    { location.benchProps?.status }
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-12 col-form-label">
                      <b>Status Since</b>
                    </label>
                    <div className="col-lg-12 col-form-label">
                    { location.benchProps?.status_since }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-form-label">
                      <b>Occupancy Hours</b>
                    </label>
                    <div className="col-form-label">
                    { location.benchProps?.occupancy_hours }
                    </div>
                  </div>
                  <div className="displayPreviewRow col-md-6">
                    <label className="col-lg-12 col-form-label">
                      <b>Notes</b>
                    </label>
                    <div className="col-lg-12 col-form-label">
                    { location.benchProps?.note }
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