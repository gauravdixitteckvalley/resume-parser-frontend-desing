import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_URL } from './../../utils/helper'
import "./style.css"

export default function Profile() {
    const userData = useSelector(state => state.authenticatedUser);
  return (
    <Fragment>
        <div className="page-header">
            <h3 className="page-title"> My Profile</h3>
            <div className="pull-right">
                <Link
                    to="/profile/edit"
                    className="btn btn-primary send-email"
                >
                    Edit Profile
                </Link>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label">
                                <b> Profile Image</b>
                            </label>
                            <div className="col-lg-7 col-form-label ">
                                <img src={userData.user.profile_image ? userData.user.profile_image :"/assets/img/user_icon.png"} alt="profile" className="img-fluid profile_image" />
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
                            {userData.user.last_name ? userData.user.last_name:""}
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
                                {userData.user.password ? "********" :"********"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
}
