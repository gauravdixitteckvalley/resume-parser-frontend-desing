import React, { useState } from 'react';
import _ from 'lodash';

import './BenchCandidatePreview.css'

export default function Reports(props) {

    return (
        <>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="page-title font-style-bold mb-4">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-checkbox-marked"></i>
                  </span>
                  Candidate Reports
                </h4>
                <hr className="mb-4" />

                
              </div>
            </div>
          </div>
        </div>
        </> 
    )
}