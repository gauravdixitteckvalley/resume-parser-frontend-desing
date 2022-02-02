import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'
import "./header.css";
// import HeaderStyle from './style'
import {loginRedirect} from '../../../utils/helper'
import { resetLoggedUserData } from '../../../actions/Login';
import { fetchResumeData, resetResumeData,updateStatusField } from "../../../actions/Resume";
import { history, displayErrorMessage } from '../../../utils/helper';
import { Link } from "react-router-dom";


const Header = (props) => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [toggleView, setToggleView] = useState("");

    const loggedUser = useSelector(state => state.authenticatedUser);
    const {user} = loggedUser;
    
    /**method to call action and redirect to home page */
    const _loggedOutUser = () => {
        dispatch(resetLoggedUserData())
        loginRedirect(user)
    }

    const _handleChange = (event) => {
        const {name, value} = event.target;
        setSearchValue(value);
    }

    const searchResume = () => {
        // console.log("Search: ", searchValue);
        if(_.isEmpty(searchValue))
            displayErrorMessage('Please input any search name first');
    
        _getData('', {searchValue});

        history.push('/resume');
    }

    var status = false;
    const toggleSidebar = () => {
        
        if (status == false) {
            document.body.classList.add('sidebar-icon-only');
            status = !status;
        }else{
            document.body.classList.remove('sidebar-icon-only');            
            status = !status;
        }
        // setToggleView(true);

    }

    const _getData = (data, params = {}) => {
        const queryParams = {
            page    : data ? data : 1,
            name    : params?.searchValue,
            /*email   : params?.searchValue,
            phone   : params?.searchValue,
            city    : params?.searchValue,
            company : params?.searchValue,
            skills  : params?.searchValue*/
        }
        dispatch(fetchResumeData(queryParams));
    }


    //For forget password link(candidate login)
    const isLoginUserFunction = (loginCondition) => {
        if(loginCondition){
            return (
                <>
                    
                    <button className="dropdown-item" href="#" onClick={() => history.push(`/candidate/changepassword/${user.id}`)}>
                    <i className="mdi mdi-logout me-2 text-primary"></i>Change    password </button>
                    <div className="dropdown-divider"></div>
                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row sidebar-icon-only">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo" to={user.isCandidateLogin ? "/candidate/dashboard" : "/dashboard"}><img src="/logo.PNG" alt="logo" /></Link> 
                    <Link className="navbar-brand brand-logo-mini" to={user.isCandidateLogin ? "/candidate/dashboard" : "/dashboard"}><img src="/mobile_logo.png" alt="logo" /></Link> 
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-stretch">
                    <button className="navbar-toggler navbar-toggler align-self-center" onClick={() => toggleSidebar()} type="button" data-toggle="minimize">
                        <span className="mdi mdi-menu"></span>
                    </button>
                    
                    {
                        loggedUser.user.isCandidateLogin === false ? 
                        <>
                            <div className="search-field d-none d-md-block">
                                <form className="d-flex align-items-center h-100" action="#">
                                    <div className="input-group">
                                        <div className="input-group-prepend bg-transparent">
                                            <Link className="search-btn" onClick={() => searchResume()}>
                                                <i className="input-group-text border-0 mdi mdi-magnify"></i>
                                            </Link>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control bg-transparent border-0" 
                                            name="name" 
                                            placeholder="Search Resume" 
                                            onChange={(event) => _handleChange(event)}
                                        />
                                    </div>
                                </form>
                            </div>
                        </> : ''
                    }
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item nav-profile dropdown">
                        <Link className="nav-link dropdown-toggle" id="profileDropdown" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="nav-profile-img">
                                <img src={loggedUser.user.profile_image ? loggedUser.user.profile_image :"/assets/img/user_icon.png"} alt="image" />
                                <span className="availability-status online"></span>
                            </div>
                            <div className="nav-profile-text">
                                <p className="mb-1 text-black">{loggedUser.user.full_name}</p>
                            </div>
                        </Link>
                        <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                            {
                                loggedUser.user.isCandidateLogin === false ? 
                                <>
                                <Link to='/profile' className="dropdown-item">
                                    <i className="mdi mdi-account me-2 text-info"></i> My Profile
                                </Link>
                                <div className="dropdown-divider"></div>
                                </> : ''
                            }
                            <Link to='/change-password' className="dropdown-item">
                                <i className="mdi mdi-lock me-2 text-info"></i> Change Password
                            </Link>
                            <Link className="dropdown-item" to="#">
                            <i className="mdi mdi-cached me-2 text-success"></i> Activity Log </Link>
                            <div className="dropdown-divider"></div>

                            { isLoginUserFunction(loggedUser.user.isCandidateLogin) }

                            <button className="dropdown-item" href="#" onClick={() => _loggedOutUser()}>
                            <i className="mdi mdi-logout me-2 text-primary"></i> Sign   out </button>
                        </div>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <Link className="nav-link count-indicator dropdown-toggle" id="messageDropdown" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="mdi mdi-email-outline"></i>
                            <span className="count-symbol bg-warning"></span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                                <h6 className="p-3 mb-0">Messages</h6>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <img src="../../assets/img/faces/face4.jpg" alt="image" className="profile-pic" />
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                                    <p className="text-gray mb-0"> 1 Minutes ago </p>
                                </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <img src="../../assets/img/faces/face2.jpg" alt="image" className="profile-pic" />
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Cregh send you a message</h6>
                                    <p className="text-gray mb-0"> 15 Minutes ago </p>
                                </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <img src="../../assets/img/faces/face3.jpg" alt="image" className="profile-pic" />
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Profile picture updated</h6>
                                    <p className="text-gray mb-0"> 18 Minutes ago </p>
                                </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <h6 className="p-3 mb-0 text-center">4 new messages</h6>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" to="#" data-bs-toggle="dropdown">
                                <i className="mdi mdi-bell-outline"></i>
                                <span className="count-symbol bg-danger"></span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                                <h6 className="p-3 mb-0">Notifications</h6>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-success">
                                    <i className="mdi mdi-calendar"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject font-weight-normal mb-1">Event today</h6>
                                    <p className="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                                </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-warning">
                                    <i className="mdi mdi-settings"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject font-weight-normal mb-1">Settings</h6>
                                    <p className="text-gray ellipsis mb-0"> Update dashboard </p>
                                </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-info">
                                        <i className="mdi mdi-link-variant"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 className="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                                        <p className="text-gray ellipsis mb-0"> New admin wow! </p>
                                    </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <h6 className="p-3 mb-0 text-center">See all notifications</h6>
                            </div>
                        </li>
                        <li className="nav-item nav-logout d-none d-lg-block">
                            <a className="nav-link" href="javascript:void(0)" onClick={() => _loggedOutUser()}>
                            <i className="mdi mdi-power"></i>
                            </a>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="mdi mdi-menu"></span>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Header       