import React,{useEffect,useState} from 'react';
import _ from 'lodash';
import { NavLink,Link } from "react-router-dom";
import './JobList.css';
import {fetchPostedJob} from  "../../actions/Job";
import { useSelector, useDispatch } from "react-redux";
import BlockUI from "../../components/BlockUI";
import Modal from '../../components/ConfirmationModal/Modal';

export default function JobList(props) {
    //const { topResume } = props;
    const jobs = useSelector(state => state.job);
      //console.log("jobs list ",jobs)
    const dispatch = useDispatch();
    const { blocking,jobPostedList } = jobs;
    const [showModal, setShowModal] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState('');
    
    useEffect(() => {
      dispatch(fetchPostedJob()) // action is called to fetch skills category list

    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    function _handleModalShowClick(e,i){
        e.preventDefault();
        //console.log("i" ,i)
        setShowModal(true)
        setSelectedRowId(i)
    }
    const _deleteskillData = (status) => {
      if(status) {
         // dispatch(deleteSkill(selectedRowId));  // action is called to get data
          _handleModalCloseClick(false);  //modal is closed
      }
  }
  const _handleModalCloseClick = (value) => {
    setShowModal(value)
}
    return (
        <>
        <BlockUI blocking={blocking} />
        <div className='new_job_btn'>
            <NavLink to={`/jobs/post-job/`} className='btn btn-gradient-primary btn-fw'>New Job Post</NavLink>
        </div>
        
        <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Posted Job List</h4>
              
              <div className="">
                <table className="table table-bordered mb-4 table-responsive">
                  <thead>
                    <tr>
                      <th> No </th>
                      <th> Job Title </th>
                      <th> Company Name </th>
                      <th> No. of Opening </th>
                      <th> Salary Range </th>
                      <th> Location </th>
                      {/* <th> Actions </th> */}
                    </tr>
                  </thead>
                  <tbody>
                  
                     {jobPostedList?.map((postDataList, index)=>{
                      return(
                      <tr key={index}>
                        <td>{index + 1 }</td>
                        <td>{postDataList.jobTitle}</td>
                        <td>{postDataList.companyName}</td>
                        <td>{postDataList.opening}</td>
                        <td>{postDataList.salary}</td>
                        <td>{postDataList.location}</td>
                          {/* <td className="actions icons-list my-mdi-cls">
                          <div className="actions-cls">
                            <NavLink
                              target="_blank"
                              to=""
                            >
                              <i className="mdi mdi mdi-eye" aria-hidden="true"></i>
                            </NavLink>
                          
                            <Link 
                              to="#"
                              title="Delete" 
                              className="ms-2" 
                              style={{'cursor':'pointer'}}
                              onClick={(event) => _handleModalShowClick(event, postDataList.id)}
                            >
                              <i className="mdi mdi-delete" aria-hidden="true"></i>
                            </Link>
                          </div>
                        </td>   */}
                      </tr>
                      )
                    })}
                  
                  </tbody>
                </table>
              </div>
              
            </div>
          </div>
        </div>
      </div>
        {showModal ? (<Modal 
            showModal={showModal} 
            handleModalClose={_handleModalCloseClick} 
            updateData={_deleteskillData}
            modalTitle="Delete Record"
            modalBody="Are you sure you wish to perform this action? This action is irreversible!"
        />) : null}
      </>
      
    )
}