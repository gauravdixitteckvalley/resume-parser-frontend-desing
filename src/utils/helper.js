import React from 'react';
import { createBrowserHistory } from 'history';
import _ from 'lodash';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

/* called when needed to redirect user to login screen*/
const loginRedirect = () => {
    localStorage.clear();
    history.push('/');
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

/* returns object to navigate pages/routes */
const history = createBrowserHistory();

/* returns base url */
const API_URL = process.env.REACT_APP_BACKEND_URL;


export {
    loginRedirect,
    displaySuccessMessage,
    displayErrorMessage,
    displayRecordNotFound,
    getLoggedInUserData,
    requestTokenHeader,
    history,
    API_URL,
}

export default handleHttpError;
