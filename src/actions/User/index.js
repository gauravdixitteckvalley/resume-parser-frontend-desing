import api from '../../axios';
import handleHttpError,{requestTokenHeader, history, displaySuccessMessage} from '../../utils/helper';

/* action for fetching user records */
export const fetchUserData = (params) => {
    return async dispatch => {
        dispatch({ type: 'USER_LIST_REQUEST' });
        try {
            const response = await api.get('user',{
                params  : params,
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'USER_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'USER_LIST_FAILURE'});
        }
    }
}

/* action for deleting user record */
export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'DELETE_USER_REQUEST' });
        try {
            const response = await api.delete('user/'+id, {
                headers : requestTokenHeader(),
            });
    
            if (response.data.success) {
                const updatedUsersList =  getState().user.userList.filter(user => user.id !== id);
                dispatch({ type : 'DELETE_USER_SUCCESS', payload : updatedUsersList});
                displaySuccessMessage('Record Deleted Successfully');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DELETE_USER_FAILURE'});
        }
    }
}

/* action for fetching user dependant records */
export const fetchUserEditFormDependantData = (id) => {
    return async dispatch => {
        dispatch({ type: 'FETCH_USER_EDIT_FORM_REQUEST' });
        try {
            const response = await api.get(`user/${id}`,{
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'FETCH_USER_EDIT_FORM_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'FETCH_USER_EDIT_FORM_FAILURE' });
        }
    }
}

/* action for submitting user record */
export const submitUserFormData = (id,postData) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_USER_FORM_REQUEST' });
        try {
            let response = '';
            if(id)
                response = await api.put(`user/${id}`, postData,{ 
                    headers : requestTokenHeader()
                });
            else
                response = await api.post(`user`, postData,{
                    headers : requestTokenHeader(),
                });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_USER_FORM_SUCCESS'});
                displaySuccessMessage(response.data.data.data);
                history.push('/user');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_USER_FORM_FAILURE' });
        }
    }
}

/* Get User roles data */
export const fetchUserRolesData = () => {
    return async dispatch => {
        dispatch({ type: 'FETCH_USER_ROLES_REQUEST' });
        try{

            const response = await api.get(`getUserRoles`,{
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'FETCH_USER_ROLES_SUCCESS', payload : response.data.data});
            } 

        } catch (error){
            handleHttpError(error.response);
            dispatch({ type: 'FETCH_USER_ROLES_FAILURE' });
        }
    }
}

export const fetchUserByRole=(data)=>{
    return async dispatch => {
        dispatch({ type: 'FETCH_USER_BY_ROLE_REQUEST' });
        try{

            const response = await api.get(`getUserByRole/${data}`,{
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                
                dispatch({ type : 'FETCH_USER_BY_ROLE_SUCCESS', payload : response.data.data});
            } 

        } catch (error){
            handleHttpError(error.response);
            dispatch({ type: 'FETCH_USER_BY_ROLE_FAILURE' });
        }
    }
}

/* action resetting user store data */
export const resetUserData = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_USER_DATA' });
    }
}