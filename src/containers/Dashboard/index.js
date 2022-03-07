import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardResume,
  fetchDashboardReset,
} from "../../actions/Dashboard";
import RecentList from './Recent/RecentList';

import "./index.css";
import CandidateStatusGraph from './Graph/CandidateStatusGraph';
import WelcomeModal from "../../components/WelcomeModal/WelcomeModal";

const Dashboard = (props) => {
  /**fetched data from redux store */
  let [callData, setCallData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const dashboardData = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    if (callData) {
      dispatch(fetchDashboardResume());
      setCallData(false);
    }
    return () => {
      dispatch(fetchDashboardReset());
    };
  }, [callData]);

  const { weeklyList, monthlyList, totalList, weeklyResumessubuser, monthlyResumessubuser, totalResumessubuser, statusList, statusData, topResume } = dashboardData;
 /*method called to close modal*/
 const _handleModalCloseClick = () => {
  setShowModal(false)
}
const _deleteskillData = (status) => {
  if(status) {
     // dispatch(deleteSkill(selectedRowId));  // action is called to get data
      _handleModalCloseClick(false);  //modal is closed
  }
}
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-home"></i>
          </span>{" "}
          Dashboard
        </h3>
        
      </div>
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body">
              <img
                src="./../assets/img/circle.svg"
                className="card-img-absolute"
                alt="circleimagefile"
              />
              <h4 className="font-weight-normal mb-3">
                All Resumes{" "}
                <i className="mdi mdi-chart-line mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">{totalList} + {totalResumessubuser} = {totalList+totalResumessubuser}</h2>
              {/* <h6 className="card-text">Increased by 60%</h6> */}
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <img
                src="./../assets/img/circle.svg"
                className="card-img-absolute"
                alt="circleimagefile"
              />
              <h4 className="font-weight-normal mb-3">
                Monthly Resume
                <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">{monthlyList} + {monthlyResumessubuser} = {monthlyList+monthlyResumessubuser}</h2>
              {/* <h6 className="card-text">Decreased by 10%</h6> */}
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <img
                src="./../assets/img/circle.svg"
                className="card-img-absolute"
                alt="circleimagefile"
              />
              <h4 className="font-weight-normal mb-3">
                Weekly Resume
                <i className="mdi mdi-diamond mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">{weeklyList} + {weeklyResumessubuser} = {weeklyList+weeklyResumessubuser}</h2>
              {/* <h6 className="card-text">Increased by 5%</h6> */}
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12 grid-margin">
         { statusData ? <CandidateStatusGraph statusList ={statusList} statusData={statusData} /> : null }
        </div>
      </div>
      <div>
      <RecentList topResume={topResume} ></RecentList>
      </div>
      {showModal ? (<WelcomeModal 
                            showModal={showModal} 
                            handleModalClose={_handleModalCloseClick} 
                            updateData={_deleteskillData}
                            modalTitle="Welcome Popup"
                            
            />) : null}
      {/* <Graph />
      <RecentEntries /> */}
      
    </>
  );
};

export default Dashboard;
