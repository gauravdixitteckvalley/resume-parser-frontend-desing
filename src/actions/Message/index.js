import api from '../../axios';
import handleHttpError,{requestTokenHeader, history, displaySuccessMessage,loginRedirect, API_URL} from '../../utils/helper';

export const messageSend = (postData = {}) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_MESSAGE_REQUEST' });
        try {
            let response = await api.post(`${API_URL}message/send`, postData,{
                headers : requestTokenHeader(),
            });
            
            dispatch({ type : 'SUBMIT_MESSAGE_SUCCESS'});
            displaySuccessMessage(response.data.data.message); 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_MESSAGE_FAILURE' });
        }
    }
}

/* action for fetching Resume records */
export const fetchMessageData = (params) => {
    return async dispatch => {
        dispatch({ type: 'MESSAGE_LIST_REQUEST' });
        try {
            const response = await api.get('message',{
                params: params,
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'MESSAGE_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            // handleHttpError(error.response);
            dispatch({ type: 'MESSAGE_LIST_FAILURE'});
        }
    }
}

/* action for fetching Resume records */
export const fetchUserData = (params) => {
    return async dispatch => {
        dispatch({ type: 'USER_LIST_REQUEST' });
        try {
            const response = await api.get('message/messageUser',{
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'USER_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            // handleHttpError(error.response);
            dispatch({ type: 'USER_LIST_FAILURE'});
        }
    }
}