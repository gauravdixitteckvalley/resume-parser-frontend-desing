import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";


import "./index.css";

const Dashboard = (props) => {
  /**fetched data from redux store */
  let [callData, setCallData] = useState(true);
  //const dashboardData = useSelector((state) => state.dashboard);
  const loggedUser = useSelector(state => state.authenticatedUser);
  //const dispatch = useDispatch();
  useEffect(() => {
    if (callData) {
      // dispatch(fetchDashboardResume());
      setCallData(false);
    }
    return () => {
      // dispatch(fetchDashboardReset());
    };
  }, [callData]);

  const { user } = loggedUser;

  return (
    <>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-home"></i>
          </span>{" "}
          Dashboard
        </h3>
        {/* <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span></span>Overview{" "}
              <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
            </li>
          </ul>
        </nav> */}
      </div>
      <div className="row" style={{fontWeight: 'bold', display: 'flex', justifyContent: 'center', fontSize: '1.5rem'}}>
        Welcome {user.full_name}
      </div>
      
    </>
  );
};

export default Dashboard;
