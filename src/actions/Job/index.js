import api from '../../axios';
import handleHttpError,{requestTokenHeader, history, displaySuccessMessage, displayMessageWithSwitchCase } from '../../utils/helper';


/* action for submitting job post */
export const submitJobPost = (postData) => {
    return async dispatch => {
        console.log("postData action ",postData)
        dispatch({ type: 'SUBMIT_JOB_POST_REQUEST' });
        try {
            let response = await api.post(`job/postJob`, postData, {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_JOB_POST_SUCCESS' });
                displaySuccessMessage(response.data.data.data);
                console.log("response.data ",response.data.data.data)
                history.push('/jobs');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_JOB_POST_FAILURE' });
        }
    }
}

/* action for fetching Posted Jobs */
export const fetchPostedJob = (params) => {
    return async dispatch => {
        dispatch({ type: 'POSTED_JOBS_LIST_REQUEST' });
        try {
            const response = await api.get('job/postedJobList',{
                params  : params,
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'POSTED_JOBS_LIST_SUCCESS', payload : response.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'POSTED_JOBS_LIST_FAILURE'});
        }
    }
}

/* get single job details */
export const getSingleJobData = (postJobId) => {
    return async dispatch => {
        dispatch({ type: 'SINGLE_JOB_GET_REQUEST' });
        try {
            let response = await api.get(`job/jobDetails/${postJobId}`, {
                headers: requestTokenHeader(),
            });

            if (response.data.success) {
                
                dispatch({ type : 'SINGLE_JOB_GET_SUCCESS', payload : response.data.data});
            }
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'SINGLE_JOB_GET_FAILURE' });
        }
    }
}

/* action for deleting user record */
export const deletePostedJob = (id) => {
    console.log("action id ",id)
    return async (dispatch, getState) => {
        dispatch({ type: 'DELETE_POSTED_JOBS_LIST_REQUEST' });
        try {
            const response = await api.delete('job/deletePostedJob/'+id, {
                headers : requestTokenHeader(),
            });
    
            if (response.data.success) {
                const updatPosedJob =  getState()//.resume.resumeList.filter(res => res.id !== id);
                dispatch({ type : 'DELETE_POSTED_JOBS_LIST_SUCCESS', payload : updatPosedJob});
                displaySuccessMessage('Record Deleted Successfully');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DELETE_POSTED_JOBS_LIST_FAILURE'});
        }
    }
}

