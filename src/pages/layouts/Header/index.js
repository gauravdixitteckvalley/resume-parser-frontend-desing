import React, {Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'
import "./header.css";
// import HeaderStyle from './style'
import {loginRedirect} from '../../../utils/helper'
import { resetLoggedUserData } from '../../../actions/Login';
import { fetchResumeData, resetResumeData,updateStatusField } from "../../../actions/Resume";
import { history, displayErrorMessage,IMAGE_URL } from '../../../utils/helper';
import { Link } from "react-router-dom";
import moment from 'moment'

const Header = (props) => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    //const [toggleView, setToggleView] = useState("");

    const loggedUser = useSelector(state => state.authenticatedUser);
    const {user} = loggedUser;
    //const currentId = user.id;

    let userType =JSON.parse(localStorage.getItem("data"));
    /**method to call action and redirect to home page */
    const _loggedOutUser = () => {
        dispatch(resetLoggedUserData())
        loginRedirect(user, userType.user_role_name)
    }

     const _handleChange = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
     }

    const searchResume = () => {
        if(_.isEmpty(searchValue))
            displayErrorMessage('Please input any search name first');
        
        localStorage.setItem("headerSearch",searchValue)
        _getData('', {searchValue});    
    }

    const _handlePressEnter = (event) => {
        event.preventDefault();
        const value = event.target.value;
        if(_.isEmpty(value))
        displayErrorMessage('Please input any search name first');

        localStorage.setItem("headerSearch",searchValue)
        _getData('', {searchValue}); 
    }

    var status = false;
    const toggleSidebar = () => {
        
        if (status === false) {
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
            sortingData : {},            
        }
        dispatch(fetchResumeData(queryParams));
        // history.push('/resume');
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

    
    const deletedMsg = loggedUser.user.message.filter(msgs => msgs.is_deleted < 1);
    
    
    return (
        <>
            <nav key="qwqewe1" className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row sidebar-icon-only">
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
                                        <input 
                                            type="text" 
                                            className="form-control bg-transparent border-0" 
                                            name="name" 
                                            placeholder="Search Resume"
                                            onChange={(event) => _handleChange(event)}
                                            onKeyPress={(event) => {
                                                var key = event.keyCode || event.which;
                                                if (key === 13)
                                                    _handlePressEnter(event)
                                            }}
                                            value= {searchValue}
                                        />
                                        <div className="input-group-prepend bg-transparent">
                                            <Link to='/resume' className="search-btn" onClick={() => searchResume()}>
                                                <i className="input-group-text border-0 mdi mdi-magnify"></i>
                                            </Link>
                                        </div>
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
                            {
                                loggedUser.user.isCandidateLogin === false ? 
                            <Link to='/change-password' className="dropdown-item">
                                <i className="mdi mdi-lock me-2 text-info"></i> Change Password
                            </Link>
                            :'' }
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/activity-log">
                            <i className="mdi mdi-cached me-2 text-success"></i> Activity Log </Link>
                            <div className="dropdown-divider"></div>

                            { isLoginUserFunction(loggedUser.user.isCandidateLogin) }

                            <button className="dropdown-item" href="#" onClick={() => _loggedOutUser()}>
                            <i className="mdi mdi-logout me-2 text-primary"></i> Sign   out </button>
                        </div>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <Link key="1233" className="nav-link count-indicator dropdown-toggle" id="messageDropdown" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="mdi mdi-email-outline"></i>

                            {
                                deletedMsg.map((data) => (
                                    <>
                                    <span className="count-symbol bg-warning" style={{ display : (!data.is_view)? 'block':'none' }}></span>
                                </>
                            ))
                            }
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                                <h6 className="p-3 mb-0">Messages</h6>
                                <div className="dropdown-divider"></div>
                               

                                {( typeof deletedMsg != "undefined" && Object.keys(deletedMsg).length > 0 )?
                                 deletedMsg.map((data, index) => (
                                        <Fragment key={index}>
                                        <Link to={`/message/message-details/${data._id}`} style={{ backgroundColor : (!data.is_view)?'rgb(219 221 223)':'' }} className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <img src={ data.users.profile_image ? IMAGE_URL+data.users.profile_image :"/assets/img/user_icon.png"} alt="image" className="profile-pic" />
                                        </div>
                                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="preview-subject ellipsis mb-1 font-weight-normal">{ data.users.first_name +' '+ data.users.last_name}</h6>
                                            <p className="text-gray mb-0"> { moment(data.createdAt).calendar() }  </p>
                                        </div>
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        </Fragment>
                                ))
                                : 
                                <>
                                <Link  className="dropdown-item preview-item">
                                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">No Message</h6>
                                    </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                </> 
                                }
                                
                                <Link to={'/message'} style={{textDecoration: 'none', color: '#000'}}><h6 className="p-3 mb-0 text-center">View All</h6></Link>
                            </div>
                        </li>
                        {
                            loggedUser.user.isCandidateLogin === false ? 
                            <>
                            <li className="nav-item dropdown">
                                <Link className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" to="#" data-bs-toggle="dropdown">
                                    <i className="mdi mdi-bell-outline"></i>
                                    <span className="count-symbol bg-danger"></span>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                                    <h6 className="p-3 mb-0">Notifications</h6>
                                    <div className="dropdown-divider"></div>
                                    {( typeof loggedUser.user.notice != "undefined" && Object.keys(loggedUser.user.notice).length > 0 )?
                                    loggedUser.user?.notice.map((data, index) => (
                                        <Fragment key={index}>
                                            <Link to={'/notifications'} className="dropdown-item preview-item">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-success">
                                                <i className="mdi mdi-calendar"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                                <h6 className="preview-subject font-weight-normal mb-1">{data.notice_text.slice(0, 20)}</h6>
                                                <p className="text-gray ellipsis mb-0"> { moment(data.createdAt).calendar() } </p>
                                            </div>
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                        </Fragment>
                                    ))
                                    : 
                                    <>
                                    <Link  className="dropdown-item preview-item">
                                        <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="preview-subject ellipsis mb-1 font-weight-normal">No Notifications</h6>
                                        </div>
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    </> 
                                    }
                                    <Link to="/notifications" style={{textDecoration: 'none', color: '#000'}}><h6 className="p-3 mb-0 text-center">See all notifications</h6></Link>
                                </div>
                            </li>
                            </> : ''
                        }
                        
                        <li className="nav-item nav-logout d-none d-lg-block">
                            <a className="nav-link" onClick={() => _loggedOutUser()}>
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