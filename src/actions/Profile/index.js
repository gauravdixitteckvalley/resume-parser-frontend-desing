import api from '../../axios';
import handleHttpError,{requestTokenHeader, history, displaySuccessMessage,loginRedirect} from '../../utils/helper';

/* action for submitting user record */
export const submitProfileFormData = (id,postData) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_PROFILE_FORM_REQUEST' });
        try {
            let response = '';
            if(id)
                response = await api.put(`profile/edit/${id}`, postData,{ 
                    headers : requestTokenHeader()
                });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_PROFILE_FORM_SUCCESS'});
                displaySuccessMessage(response.data.data.data);
                history.push('/profile');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_PROFILE_FORM_FAILURE' });
        }
    }
}

export const submitUpdatePasswordFormData = (userData,postData) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_UPDATE_PASSWORD_FORM_REQUEST' });
        try {
            let response = '';
            if(userData.user.id)
                response = await api.put(`profile/change-password/${userData.user.id}`,postData,{ 
                    headers : requestTokenHeader()
                });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_UPDATE_PASSWORD_FORM_SUCCESS'});
                displaySuccessMessage(response.data.data.data);
                //history.push('/profile');
                dispatch({type : 'CHANGE_LOGGED_USER_DATA'});
                setTimeout(function(){ loginRedirect(userData); }, 2000);
                
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_UPDATE_PASSWORD_FORM_FAILURE' });
        }
    }
}