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
                dispatch({ type : 'SUBMIT_JOB_POST_SUCCESS', payload :response.data.data.candidateId });
                displaySuccessMessage(response.data.data.message);
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

/* action for deleting user record */
/*export const deletePostedJob = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'DELETE_POSTED_JOBS_LIST_REQUEST' });
        try {
            const response = await api.delete('skills/'+id, {
                headers : requestTokenHeader(),
            });
    
            if (response.data.success) {
                const updatedSkillList =  getState().skills.skillsList.filter(skills => skills.id !== id);
                dispatch({ type : 'DELETE_POSTED_JOBS_LIST_SUCCESS', payload : updatedSkillList});
                displaySuccessMessage('Record Deleted Successfully');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DELETE_POSTED_JOBS_LIST_FAILURE'});
        }
    }
}
*/
