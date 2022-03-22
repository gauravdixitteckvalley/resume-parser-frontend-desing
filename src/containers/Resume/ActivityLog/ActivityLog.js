import React, { useEffect, useState ,Fragment } from "react"
import { useSelector, useDispatch } from 'react-redux'
import BlockUI from "../../../components/BlockUI";
import './ActivityLog.css';
import {fetchActivityLogs} from "../../../actions/ActivityLog";
import _ from "lodash";

const ActivityLog = () => {
    let localData=  JSON.parse(localStorage.getItem('data'));
    //const [fields,setFields] = useState([]);
    const logs = useSelector(state=>state.activity);
    const dispatch = useDispatch();
   
    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
            dispatch(fetchActivityLogs(localData.id ))
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    const {blocking, activityList} = logs;
    const fetchDateAndTime = (fetchDateTime) => {
            let fetchDate = new Date(fetchDateTime);
            let newDate = fetchDate.getDate();
            let newMonth = fetchDate.getMonth();
            let newYear = fetchDate.getFullYear();

            let hours = fetchDate.getHours() > 12 ? fetchDate.getHours() - 12 : fetchDate.getHours();
            let am_pm = fetchDate.getHours() >= 12 ? "PM" : "AM";
            hours = hours < 10 ? "0" + hours : hours;
            let minutes = fetchDate.getMinutes() < 10 ? "0" + fetchDate.getMinutes() : fetchDate.getMinutes();
            let time = hours + ":" + minutes +  am_pm;
            return (
                <Fragment >
                    {newDate}/{newMonth}/{newYear}, {time}                     
                </Fragment>
            )
    }
    const getMethod = (method) => {
        let setMethod = method;
        if(setMethod === "POST"){
            setMethod = "Add"
        }else if(setMethod === "PUT"){
            setMethod = "Update"
        }else if(setMethod === "DELETE"){
            setMethod = "Delete"
        }else{
            setMethod = ' '
        }
    
        return (
            <Fragment >
               {setMethod}                  
            </Fragment>
        )
    }
    const getStatus = (status) => {
        let newStatus = status;
    
        if(newStatus === "200"){
            newStatus = "successfully";
        }else{
            newStatus = "error";
        }
        return (
            <Fragment >
               {newStatus}                     
            </Fragment>
        )
    }
    return (
        <Fragment>
             <BlockUI blocking={blocking} />
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                    <div className="card-body">
                        <h4 className="page-title font-style-bold mb-4">
                        Activity Log
                        </h4>
                        <hr className="mb-4" />
                        <div className="table-responsive">
                    {/* { activityList ? */}
                            <table className="table table-bordered mb-4 activity">
                                <thead>
                                    <tr>
                                        <th> Operation </th>
                                        <th> Status </th>
                                        <th> Date and time 
                                            <button className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                                            <button className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                                        </th>
                                        <th> IP Address </th>
                                    </tr>
                                </thead>
                                <tbody>       
                                    {activityList ? activityList.map((data,key)=>{
                                            return(<tr key={data._id}>
                                                <td> {getMethod(data.req_method)} {data.req_page} </td>
                                                <td> {getMethod(data.req_method)} {getStatus(data.res_code)}</td>
                                                <td>{fetchDateAndTime(data.current_time)}</td>
                                                <td> {data.req_ip} </td>
                                            </tr>)
                                        }):''}
                                </tbody>
                            </table> 
                            {/* :''} */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ActivityLog