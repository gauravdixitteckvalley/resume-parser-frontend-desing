import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Profile() {
    const userData = useSelector(state => state.authenticatedUser);
    console.log(userData, " userData ")
  return (
    <Fragment>
        <div className="page-header">
            <h3 className="page-title"> My Profile</h3>
        </div>

        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="displayPreviewRow">
                            <div className="col-lg-12 ">
                                {/* {fields.name || ""} */}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label">
                                <b> Profile Image</b>
                            </label>
                            <div className="col-lg-7 col-form-label">
                                <img src="/assets/img/user_icon.png" alt="profile" />
                                {/* {fields.name || ""} */}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label">
                                <b> First Name</b>
                            </label>
                            <div className="col-lg-7 col-form-label">
                                {userData.user.first_name ? userData.user.first_name:""}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label">
                                <b> Last Name</b>
                            </label>
                            <div className="col-lg-7 col-form-label">
                                {/* {fields.name || ""} */}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label">
                                <b>Email</b>
                            </label>
                            <div className="col-lg-7 col-form-label">
                                {userData.user.email ? userData.user.email:""}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label">
                                <b>Username</b>
                            </label>
                            <div className="col-lg-7 col-form-label">
                                {userData.user.username ? userData.user.username:""}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label">
                                <b>Password</b>
                            </label>
                            <div className="col-lg-7 col-form-label">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
}
