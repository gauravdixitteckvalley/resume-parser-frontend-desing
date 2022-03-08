import React from 'react';
import _ from 'lodash';
import { NavLink } from "react-router-dom"
import './RecentList.css';

const RecentList = (props) => {
    const { topResume } = props;

    const _ManageStatus = (data) =>{
      if(data.candidate_status === "1"){
        return ( <><label className="badge badge-gradient-info">{data.candidate_status_name[0].name}</label></> )
      }else if(data.candidate_status === "2"){
        return ( <><label className="badge badge-gradient-warning">{data.candidate_status_name[0].name}</label></> )
      }else if(data.candidate_status === "3"){
        return ( <><label className="badge badge-gradient-success">{data.candidate_status_name[0].name}</label></> )
      }else if(data.candidate_status === "4"){
        return ( <><label className="badge badge-gradient-danger">{data.candidate_status_name[0].name}</label></> )
      }else{
        return(<></>)
      }
    }

    const _LatestRecord = (data) =>{
      if (!_.isEmpty(topResume)) {
        return( 
          topResume.map((data, index) => (
            <tr key={`topResume-${index}`}>
              <td>
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
          <tr key={`topResume`}>
              <td className="alert alert-info m-t-20 text-center" colSpan={5}>
                <i className="fa fa-info-circle"></i> No Record Found
              </td>
          </tr>
      )
      }
    }

    return (
        <>
        <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Candidates</h4>
              <div className="">
                <table className="table table-bordered mb-4 table-responsive">
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
      </>
      
    )
}
export default RecentList;