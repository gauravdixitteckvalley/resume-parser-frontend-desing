import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import TlReport from './TlReport';
import { getTlGraphData } from '../../actions/Employee'
import { useSelector, useDispatch } from 'react-redux'
import './BenchCandidatePreview.css'

export default function Reports(props) {
    const bench = useSelector(state => state.employee);
    const dispatch = useDispatch();
    useEffect(()=>{
        _getData();
    },[]);

    const _getData = (data, params = {}) => {
       
        const queryParams = {
          page    : data ? data : 1,    
          email   : params?.email,
          code   : params?.empcode,
          tl    : params?.tl,
          skillsSearch : params?.skillsSearch,
          skillsData  : params?.skillsData,
          sortingData : params.sortingData === undefined ? {} : params.sortingData,
    
        }
        
        dispatch(getTlGraphData(queryParams))
      }
      

    const { blocking, candidateList, TlList } = bench;

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
                  Team Leaders Report
                </h4>
                <hr className="mb-4" />
                <TlReport candidateList={candidateList} TlList={TlList} />
                
              </div>
            </div>
          </div>
        </div>
        </> 
    )
}