import api from '../../axios';
import handleHttpError,{requestTokenHeader, history, displaySuccessMessage, displayMessageWithSwitchCase } from '../../utils/helper';


/* action for submitting bench employee file */
export const submitBenchEmployeePost = (postData) => {
    return async dispatch => {
        
        dispatch({ type: 'SUBMIT_BENCH_EMPLOYEE_REQUEST' });
        try {
            let response = await api.post(`employee/upload-bench-employee`, postData, {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                
                dispatch({ type : 'SUBMIT_BENCH_EMPLOYEE_SUCCESS', payload :response.data });
                displaySuccessMessage(response.data.data.message);
                history.push('/bench-candidate-list');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_BENCH_EMPLOYEE_FAILURE' });
        }
    }
}

/* action for getting bench employee list */
export const getBenchEmployee = (params) => {
    return async dispatch => {
        
        dispatch({ type: 'BENCH_EMPLOYEE_LIST_REQUEST' });
        try {
            let response = await api.get(`employee/bench-employee`, {
                params  : params,
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'BENCH_EMPLOYEE_LIST_SUCCESS', payload :response.data.data });
                displaySuccessMessage(response.data.data.message);
                history.push('/bench-candidate-list');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'BENCH_EMPLOYEE_LIST_FAILURE' });
        }
    }
}