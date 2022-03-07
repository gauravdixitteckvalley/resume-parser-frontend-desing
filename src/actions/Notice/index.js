import api from '../../axios';
import handleHttpError,{requestTokenHeader,  displaySuccessMessage, API_URL} from '../../utils/helper';

export const noticeSend = (postData = {}) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_NOTICE_REQUEST' });
        try {
            let response = await api.post(`${API_URL}notice/send`, postData,{
                headers : requestTokenHeader(),
            });
            
            dispatch({ type : 'SUBMIT_NOTICE_SUCCESS'});
            displaySuccessMessage(response.data.data.notice); 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_NOTICE_FAILURE' });
        }
    }
}

/* action for fetching Resume records */
export const fetchNoticeData = (params) => {
    return async dispatch => {
        dispatch({ type: 'NOTICE_LIST_REQUEST' });
        try {
            const response = await api.get('notice',{
                params: params,
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'NOTICE_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            // handleHttpError(error.response);
            dispatch({ type: 'NOTICE_LIST_FAILURE'});
        }
    }
}

/* action for fetching Resume records */
export const fetchUserData = (params) => {
    return async dispatch => {
        dispatch({ type: 'NOTICE_USER_LIST_REQUEST' });
        try {
            const response = await api.get('message/messageUser',{
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'NOTICE_USER_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            // handleHttpError(error.response);
            dispatch({ type: 'NOTICE_USER_LIST_FAILURE'});
        }
    }
}