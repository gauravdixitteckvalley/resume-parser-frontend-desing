import api from '../../axios';
import handleHttpError,{requestTokenHeader, displaySuccessMessage, history} from '../../utils/helper';

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
            let response = await api.post(`resume/parse`, postData,{
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

/* action for submitting manual resume record */
export const submitManualResumeFormData = (postData) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_MANUAL_RESUME_FORM_REQUEST' });
        try {
            let response = await api.post(`resume/manual`, postData, {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_MANUAL_RESUME_FORM_SUCCESS'});
                displaySuccessMessage(response.data.data.data);
                history.push('/resume');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_MANUAL_RESUME_FORM_FAILURE' });
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
                displaySuccessMessage(response.data.data.data);
                history.push('/resume');
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
