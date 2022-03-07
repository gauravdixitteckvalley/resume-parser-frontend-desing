import api from '../../axios';
import handleHttpError,{requestTokenHeader,  displaySuccessMessage, API_URL} from '../../utils/helper';

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
            handleHttpError(error.response);
            dispatch({ type: 'USER_LIST_FAILURE'});
        }
    }
}

/* action for fetching message detail */
export const fetchMessageDetail = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'MESSAGE_DETAIL_REQUEST' });
        try {
            const response = await api.get(`message/message-detail/${id}`,{
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
               
                
                const updatedUsersList =  getState().authenticatedUser.user.message.map((user) =>{ if (id===user._id){ return { ...user,is_view: true } }else{ return user }  });
                getState().authenticatedUser.user.message= updatedUsersList;
                dispatch({ type : 'LOGIN_SUCCESS', payload : { ...getState().authenticatedUser.user} });
                dispatch({ type : 'MESSAGE_DETAIL_SUCCESS', payload : response.data.data});
                localStorage.setItem('data', JSON.stringify({ ...getState().authenticatedUser.user}));
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'MESSAGE_DETAIL_FAILURE'});
        }
    }
}

/* action for fetching sent message records */
export const fetchSentMessageData = (params) => {
    return async dispatch => {
        dispatch({ type: 'SENT_MESSAGE_LIST_REQUEST' });
        try {
            const response = await api.get('message/sent-item',{
                params: params,
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'SENT_MESSAGE_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SENT_MESSAGE_LIST_FAILURE'});
        }
    }
}