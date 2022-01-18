import api from '../../axios';
import handleHttpError,{requestTokenHeader, displaySuccessMessage, history } from '../../utils/helper';

/* action for fetching Resume records */
export const fetchSkillsData = (params) => {
    return async dispatch => {
        dispatch({ type: 'SKILLS_LIST_REQUEST' });
        try {
            const response = await api.get('skills',{
                params  : params,
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'SKILLS_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SKILLS_LIST_FAILURE'});
        }
    }
}

/* action for fetching skills edit records */
export const fetchSkillsEditFormData = (id) => {
    return async dispatch => {
        dispatch({ type: 'FETCH_SKILLS_EDIT_FORM_REQUEST' });
        try {
            const response = await api.get(`skills/${id}`,{
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'FETCH_SKILLS_EDIT_FORM_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'FETCH_SKILLS_EDIT_FORM_FAILURE' });
        }
    }
}

/* action for submitting user record */
export const submitSkillsFormData = (id,postData) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_SKILLS_FORM_REQUEST' });
        try {
            let response = '';
            if(id)
                response = await api.put(`skills/${id}`, postData,{ 
                    headers : requestTokenHeader()
                });
            else
                response = await api.post(`skills`, postData,{
                    headers : requestTokenHeader(),
                });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_SKILLS_FORM_SUCCESS'});
                displaySuccessMessage(response.data.data.data);
                history.push('/skills');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_SKILLS_FORM_FAILURE' });
        }
    }
}

/* action for deleting user record */
export const deleteSkill = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'DELETE_SKILLS_REQUEST' });
        try {
            const response = await api.delete('skills/'+id, {
                headers : requestTokenHeader(),
            });
    
            if (response.data.success) {
                const updatedSkillList =  getState().skills.skillsList.filter(skills => skills.id !== id);
                dispatch({ type : 'DELETE_SKILLS_SUCCESS', payload : updatedSkillList});
                displaySuccessMessage('Record Deleted Successfully');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DELETE_SKILLS_FAILURE'});
        }
    }
}

