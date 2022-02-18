import React from 'react';
import { createBrowserHistory } from 'history';
import _ from 'lodash';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

/* called when needed to redirect user to login screen*/
const loginRedirect = (user = {}) => {
    localStorage.clear();
    const splitPath = window.location.href.split('/')
    let isCandidateLogin = false
    let redirectRoute
    if(Object.keys(user).length > 0 ){
        redirectRoute = user.isCandidateLogin ? '/login/candidate' : '/login'
    }
    if(splitPath.length > 0){
        for(let path of splitPath){
            if(path === 'candidate')
                isCandidateLogin = true
        }
        redirectRoute = isCandidateLogin ? '/login/candidate' : '/login'
    }
    
    history.push(redirectRoute);
};

/* called when there is need to display success messages */
const displaySuccessMessage = (message) => {
    toastr.success(message, 
        {"showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 3000, "closeButton": false}
    );
};

/* called when there is need to display error messages */
const displayErrorMessage = (message) => {
    toastr.error(message, 
       {"showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 3000, "closeButton": false }
    );
};

/* gets displayed when there is no record in listing page */
const displayRecordNotFound = (message = "No Records Found") => {
    return (
        <div className="alert alert-info m-t-20 text-center">
            <i className="fa fa-info-circle"></i> {message}
        </div>
    )    
};

/* handles error of listing HTTP requests */
const handleHttpError = (response) => {
    if(!_.isEmpty(response)) {
        if (response.data.status === 401) {
            loginRedirect();
        } else if (response.data.status === 422) {
            const message = Object.keys(response.data.data).map((key, i) => {
                return response.data.data[key].message;
            });
            displayErrorMessage(message);
        } else {
            const errorMessage = response.data.data;
            displayErrorMessage(errorMessage);
        }
    } else {
        displayErrorMessage('Something went wrong');
    }
}

/* returns logged in user info */
const getLoggedInUserData = () => {
    let user = {};
    let obj = JSON.parse(localStorage.getItem('data'));
    if(!_.isEmpty(obj)) {
        user = (obj);
    }

    return user;
}

/* returns header for axios request */
const requestTokenHeader = () => {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (accessToken) {
        return {'Authorization': 'Bearer ' + accessToken };
    }

    return {}; 
}

//Displaying success message on candidate step form submittion
const displayMessageWithSwitchCase = step => {
    let message
    switch(step){
        case 1:
            message = 'Step 1'
            break
        case 2:
            message = 'Step 2'
            break
        case 3:
            message = 'Step 3'
            break
        case 4:
            message = 'Step 4'
            break
        case 5:
            message = 'Step 5'
            break
        case 6:
            message = 'Step 6'
            break
        case 7:
            message = 'Step 7'
            break
        default:
            return
    }
    displaySuccessMessage(`${message} Saved Successfully`);
}

/* returns object to navigate pages/routes */
const history = createBrowserHistory();

/* returns base url */
const API_URL = process.env.REACT_APP_BACKEND_URL;
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;


export {
    loginRedirect,
    displaySuccessMessage,
    displayErrorMessage,
    displayRecordNotFound,
    getLoggedInUserData,
    requestTokenHeader,
    displayMessageWithSwitchCase,
    history,
    API_URL,
    IMAGE_URL,
}

export default handleHttpError;
