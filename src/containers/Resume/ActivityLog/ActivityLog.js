import React, { Fragment } from "react"

import BlockUI from "../../../components/BlockUI";
import './ActivityLog.css';

const ActivityLog = () => {
    const blocking = false;
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
                    <table className="table table-bordered mb-4 activity">
                    <thead>
                        <tr>
                            <th> Operation </th>
                            <th> Status </th>
                            <th> Date and time 
                                <button className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                                <button className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Added Resume </td>
                            <td> Added successfully </td>
                            <td> 14/02/2022, 02:31PM </td>
                        </tr>
                        <tr>
                            <td> Changed Password </td>
                            <td> Failed </td>
                            <td> 14/02/2022, 02:48PM </td>
                        </tr>
                        <tr>
                            <td> Changed Password </td>
                            <td> Changed successfully </td>
                            <td> 14/02/2022, 02:50PM </td>
                        </tr>
                        <tr>
                            <td> Updated Profile </td>
                            <td> Updated successfully </td>
                            <td> 14/02/2022, 02:50PM </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
    )
}

export default ActivityLog