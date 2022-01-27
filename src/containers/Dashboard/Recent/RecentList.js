import React from 'react';
import _ from 'lodash';
import { displayRecordNotFound } from '../../../utils/helper';
import { NavLink } from "react-router-dom"
import './RecentList.css';

const RecentList = (props) => {
    const { topResume } = props;
    // const topResume  = '';

    const _ManageStatus = (data) =>{
      if(data.candidate_status === "1"){
        return ( <label className="badge badge-gradient-info">{data.candidate_status_name[0].name}</label> )
      }else if(data.candidate_status === "2"){
        return ( <label className="badge badge-gradient-warning">{data.candidate_status_name[0].name}</label> )
      }else if(data.candidate_status === "3"){
        return ( <label className="badge badge-gradient-success">{data.candidate_status_name[0].name}</label> )
      }else if(data.candidate_status === "4"){
        return ( <label className="badge badge-gradient-danger">{data.candidate_status_name[0].name}</label> )
      }else{
        return('')
      }
    }

    const _LatestRecord = (data) =>{
      if (!_.isEmpty(topResume)) {
        return( 
          topResume.map((data, index) => (
            <tr>
              <td>
                {/* <img
                  src="./../../assets/img/faces/face1.jpg"
                  className="me-2"
                  alt="image"
                /> */}
                {data.name}
              </td>
              <td> {data.email} </td>
              <td>
                {_ManageStatus(data)}
              </td>
              <td>  { data.phone } </td>
              <td>  { data.created_at } </td>
            </tr>
          ))
        )
      }else{
        return (
          displayRecordNotFound('No Resume Found')
      )
      }
    }
    // console.log('asasd',props);
    // if (!_.isEmpty(topResume)) {

    return (
        <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Candidates</h4>
              <div className="table-responsive">
                <table className="table table-bordered mb-4">
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> Email </th>
                      <th> Status </th>
                      <th> Phone </th>
                      <th> Created Date </th>
                    </tr>
                  </thead>
                  <tbody>
                  {  _LatestRecord(topResume) }
                  </tbody>
                </table>
              </div>
              <NavLink to={`/resume/`} className='btn btn-gradient-primary btn-fw'>More</NavLink>
            </div>
          </div>
        </div>
      </div>
      
    )
  // }else{
  //   return ( 's')
  // }
}
export default RecentList;