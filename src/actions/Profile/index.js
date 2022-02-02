import api from '../../axios';
import handleHttpError,{requestTokenHeader, history, displaySuccessMessage} from '../../utils/helper';

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