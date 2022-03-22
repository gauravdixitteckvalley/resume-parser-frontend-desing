import api from '../../axios';
import handleHttpError,{requestTokenHeader} from '../../utils/helper';

/* action for fetching sent message records */
export const fetchActivityLogs = (id) => {
    return async dispatch => {
        dispatch({ type: 'ACTIVITY_LIST_REQUEST' });
        try {
            const response = await api.get(`/activityLog/${id}`,{
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'ACTIVITY_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'ACTIVITY_LIST_FAILURE'});
        }
    }
}