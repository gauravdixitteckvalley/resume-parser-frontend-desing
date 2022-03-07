import api from '../../axios';
import handleHttpError,{requestTokenHeader, displaySuccessMessage, displayErrorMessage, history, loginRedirect } from '../../utils/helper';

/* action for fetching Resume records */
export const fetchResumeData = (params) => {
    
    return async dispatch => {
        dispatch({ type: 'RESUME_LIST_REQUEST' });
        try {
            const response = await api.get('resume',{
                params  : params,
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'RESUME_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'RESUME_LIST_FAILURE'});
        }
    }
}

/* action resetting resume store data */
export const resetResumeData = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_RESUME_DATA' });
    }
}

/* action for submitting resume record */
export const submitResumeData = (postData) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_RESUME_FORM_REQUEST' });
        try {
            let response = '';
            
            response = await api.post(`resume/parse`, postData,{ 
                headers : requestTokenHeader(),
            });

            let existEmails = [];
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_RESUME_FORM_SUCCESS'});
                if (response.data.data.preExistEmails) {
                    existEmails = JSON.parse(response.data.data.preExistEmails);                    
                }
                
                if (existEmails.length === 0) {
                    displaySuccessMessage(response.data.data.data);
                } else {
                    existEmails.forEach(element => {
                        displayErrorMessage('Resume of '+ element +' is already exist with the mail id ');
                    });
                    // displaySuccessMessage(response.data.data.data);
                }
                
                
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_RESUME_FORM_FAILURE' });
        }
    }
}



/* action for update resume recode */
export const updateResumeFormData = (id, postData) => {
    return async dispatch => {
        dispatch({ type: 'UPDATE_RESUME_FORM_REQUEST' });
        try {
            let response = await api.put(`/resume/candidate/${id}`, postData, {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'UPDATE_RESUME_FORM_SUCCESS'});
                const { message, isCandidateLogin, id } = response.data.data
                displaySuccessMessage(message);
                const redirectLink = isCandidateLogin ? `/candidate/view/${id}` : '/resume'
                history.push(redirectLink);
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'UPDATE_RESUME_FORM_FAILURE' });
        }
    }
}

/* action for submitting resume record */
export const deleteResumeOnRemove = (postData) => {
    return async dispatch => {
        dispatch({ type: 'DELETE_RESUME_ON_REMOVE' });
        try {
            let response = await api.post(`resume/delete-file`, postData,{
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_RESUME_FORM_SUCCESS'});
                displaySuccessMessage(response.data.data.data);
                //history.push('/resume');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_RESUME_FORM_FAILURE' });
        }
    }
}

/*Update Resume Status */
export const updateStatusField=(postData)=>{
    return async dispatch =>{
        dispatch({type:'UPDATE_RESUME_STATUS_REQUEST'})
        try {
            let response = await api.post(`/resume/update-status`, postData,{
                headers: requestTokenHeader(),
            });

            if (response.data.success) {
                dispatch({ type : 'UPDATE_RESUME_STATUS_SUCCESS', payload : response.data.data});
            }
        }catch(error){
            handleHttpError(error.response);
            dispatch({ type: 'UPDATE_RESUME_STATUS_FAILURE' });
        }
    }
}

/* get particular resume details */
export const getSingleResumeData = (params) => {
    return async dispatch => {
        dispatch({ type: 'SINGLE_RESUME_GET' });
        try {
            let response = await api.get(`/resume/candidate/${params}`, {
                headers: requestTokenHeader(),
            });

            if (response.data.success) {
                
                dispatch({ type : 'GET_RESUME_DATA_SUCCESS', payload : response.data.data});
            }
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_RESUME_DATA_FAILURE' });
        }
    }
}

/* get particular resume communication */
export const getResumeCommunication = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_RESUME_COMMUNICATION_REQUEST' });
        try {
            let response = await api.get(`/resume/communication/${params}`, {
                headers: requestTokenHeader(),
            });

            if (response.data.success) {
                dispatch({ type : 'GET_RESUME_COMMUNICATION_SUCCESS', payload : response.data.data});
            }
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_RESUME_COMMUNICATION_FAILURE' });
        }
    }
}

/*Add Resume Comment */
export const addResumeComment=(id,postData)=>{
    return async dispatch =>{
        dispatch({type:'SUBMIT_RESUME_NOTE_REQUEST'})
        try {
            let response = await api.post(`/resume/communication-comment`, postData,{
                headers: requestTokenHeader(),
            });

            if (response.data.success) {
                dispatch({ type : 'SUBMIT_RESUME_NOTE_SUCCESS', payload : response.data.data});
                dispatch(getResumeCommunication(id))

            }
        }catch(error){
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_RESUME_NOTE_FAILURE' });
        }
    }
}

/*export const fetchResumeDataFromHeader = (params) => {
    return async dispatch => {
        dispatch({ type: 'RESUME_LIST_REQUEST_HEADER' });
        try {
            const response = await api.get('resume',{
                params  : params,
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'RESUME_LIST_SUCCESS_HEADER', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'RESUME_LIST_FAILURE_HEADER'});
        }
    }
}*/

/* get country list */
export const getCountryList = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_COUNTRY_REQUEST' });
        try {
            let response = await api.get(`/resume/country`, {
                headers: requestTokenHeader(),
            });

            if (response.data.success) {
                dispatch({ type : 'GET_COUNTRY_SUCCESS', payload : response.data.data});
            }
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_COUNTRY_FAILURE' });
        }
    }
}

/* get state list */
export const getStateList = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_STATE_REQUEST' });
        try {
            let response = await api.get(`/resume/state/${params}`, {
                headers: requestTokenHeader(),
            });

            if (response.data.success) {
                dispatch({ type : 'GET_STATE_SUCCESS', payload : response.data.data});
            }
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_STATE_FAILURE' });
        }
    }
}

/* multi mail send */
export const sendMultiMail = (params) => {
    return async dispatch => {
        dispatch({ type: 'SEND_MULTIPLE_MAIL_REQUEST' });
        try {
            let response = await api.post(`/mail/send-multiple`,params, {
                headers: requestTokenHeader(),
            });

            if (response.data) {
                dispatch({ type : 'SEND_MULTIPLE_MAIL_SUCCESS', payload : response.data.data});
                displaySuccessMessage('Mails sent successfully');
            }else{
                dispatch({ type : 'SEND_MULTIPLE_MAIL_FAILURE', payload : response.data.data});
                displayErrorMessage('Mails sending error');
            }
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'SEND_MULTIPLE_MAIL_FAILURE' });
            displayErrorMessage('Mail not sent');
        }
    }
}

/* single mail send */ 
export const sendMail = (params) => {
    return async dispatch => {
        dispatch({ type: 'SEND_MAIL_REQUEST' });
        try {
            let response = await api.post(`/mail/send`,params, {
                headers: requestTokenHeader(),
            });
            
            if (response.data) {
                dispatch({ type : 'SEND_MAIL_SUCCESS', payload : response.data.data});
                displaySuccessMessage('Mail sent successfully');
            }else{
                dispatch({ type : 'SEND_MAIL_FAILURE', payload : response.data.data});
                displayErrorMessage('Mail not sent');
            }
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'SEND_MAIL_FAILURE' });
            displayErrorMessage('Mail not sent');
        }
    }
}

/* action for deleting resume record */
export const deleteResume = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'DELETE_RESUME_REQUEST' });
        try {
            const response = await api.delete('resume/resume/'+id, {
                headers : requestTokenHeader(),
            });
    
            if (response.data.success) {
                const updatedResumeList =  getState().resume.resumeList.filter(res => res.id !== id);
                dispatch({ type : 'DELETE_RESUME_SUCCESS', payload : updatedResumeList});
                displaySuccessMessage('Record Deleted Successfully');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DELETE_RESUME_FAILURE'});
        }
    }
}


/* action for change candidate password */
export const actionChangeCandidatePassword=(postData, user)=>{
    return async dispatch =>{
        dispatch({type:'SUBMIT_CHANGE_PASSWORD_REQUEST'})
        try {
            let response = await api.post(`/resume/candidate/changePassword`, postData,{
                headers: requestTokenHeader(),
            });

            if (response.data.success) {
                dispatch({ type : 'SUBMIT_CHANGE_PASSWORD_SUCCESS', payload : response.data.data});
                displaySuccessMessage(response.data.data.message);
                setTimeout(() => {
                    loginRedirect(user)
                }, 3000)

            }
        }catch(error){
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_CHANGE_PASSWORD_FAILURE' });
        }
    }
}

/* get candidate list */
export const getCandidateList = () => {
    return async dispatch => {
        dispatch({ type: 'GET_CANDIDATE_REQUEST' });
        try {
            let response = await api.get(`/resume/candidate`, {
                headers: requestTokenHeader(),
            });

            if (response.data.success) {
                dispatch({ type : 'GET_CANDIDATE_SUCCESS', payload : response.data.data});
            }
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_CANDIDATE_FAILURE' });
        }
    }
}            
/* action for update resume recode */
export const updateResume = (id, postData) => {
    return async dispatch => {
        dispatch({ type: 'UPDATE_RESUME_REQUEST' });
        try {
            let response = await api.put(`/resume/candidate/resumeUpload/${id}`, postData, {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'UPDATE_RESUME_SUCCESS'});
                const { message } = response.data.data
                displaySuccessMessage(message);
                const redirectLink = `/candidate/view/${id}`;
               // setTimeout(()=>{history.push(redirectLink)},2000)
                window.location.href = redirectLink;
               // history.push(redirectLink);
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'UPDATE_RESUME_FAILURE' });
        }
    }
}