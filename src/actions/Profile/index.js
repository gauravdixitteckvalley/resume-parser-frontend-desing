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
