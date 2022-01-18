import api from '../../axios';
import handleHttpError,{requestTokenHeader} from '../../utils/helper';

/* action for fetching Resume montly and weekly records count */
export const fetchDashboardResume = () => {
    return async dispatch => {
        dispatch({ type: 'RESUME_DASHBOARD_REQUEST' });
        try {
            const response = await api.get('/resume/dashboard',{
                headers : requestTokenHeader(),
            });

            if (response.data.success) {
                dispatch({ type : 'RESUME_DASHBOARD_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'RESUME_DASHBOARD_FAILURE'});
        }
    }
}

export const fetchDashboardReset=()=>{
    return async dispatch => {
        dispatch({ type: 'RESET_DASHBOARD_REQUEST' });
    }
    
}