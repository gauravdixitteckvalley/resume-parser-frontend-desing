import React,{ Fragment, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { fetchCandidateData } from '../../../actions/Candidate'
import BlockUI from "../../../components/BlockUI";
import { DeveloperResumeToPrint } from './DeveloperResumeToPrint';

import './DeveloperResume.css'
import _ from "lodash";
import ReactToPrint from 'react-to-print';

const DeveloperResume = (props) => {


    const candidateData = useSelector(state=> state.candidate)
    const location = useLocation();
    const dispatch = useDispatch()
    const [empCode, setEmpCode] = useState('') 
    const [empTitle, setEmpTitle] = useState('')
    const [empTools, setEmpTools] = useState('') 
    const [empCoreCompetencie, setEmpCoreCompetencie] = useState([]) 
    const componentRef = useRef();



    useEffect(() => {
      console.log('sssss',location.state.coreCompetencie);
       setEmpCode(location.state.templateData.emp_code);
       setEmpTitle(location.state.templateData.emp_title);
       setEmpTools(location.state.templateData.tools)
       setEmpCoreCompetencie(location.state.templateData.core_competencies)
       
       if(location.state.templateData.candidate_name){
            dispatch(fetchCandidateData(location.state.templateData.candidate_name))
       }
       
    }, [location]);

    const { blocking , candidateInfo} = candidateData;
    var projectArray = [];
    if(candidateInfo?.project !== undefined){
        projectArray = _.chunk(candidateInfo.project, 4)
    }
    
    return (
        <Fragment>
        <BlockUI blocking={blocking} /> 
        <div className="resumeCanvas">
            <div className="add-items row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                  <h3 className="page-title" style={{fontWeight: '600'}}> Resume Preview</h3>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-end text-right">
                  <NavLink to="/select-resume">
                    <button
                      type="button"
                      className="btn btn-gradient-primary btn-fw mb-2"
                    >
                      Back
                    </button>
                  </NavLink>
                  
                    <ReactToPrint
                        trigger={() => <button className="btn btn-gradient-primary btn-fw mb-2" >Download</button>}
                        content={() => componentRef.current}
                    />
                    
                </div>
              </div>
             {/* Page 1 Start */}
             
             <DeveloperResumeToPrint 
                ref={componentRef} 
                projectArray={projectArray} 
                empCode={empCode} 
                empTitle={empTitle} 
                empTools={empTools} 
                candidateInfo={candidateInfo} 
                coreCompetencie={empCoreCompetencie}
            />
            
             {/* Page 5 end  */}
             <div className="add-items row mt-5">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                  
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-end text-right">
                <NavLink to="/select-resume">
                    <button
                      type="button"
                      className="btn btn-gradient-primary btn-fw mb-2"
                    >
                      Back
                    </button>
                </NavLink>
                <ReactToPrint
                    trigger={() => <button className="btn btn-gradient-primary btn-fw mb-2" >Download</button>}
                    content={() => componentRef.current}
                />
                </div>
              </div>
        </div>
        </Fragment>
    )
}

export default DeveloperResume;