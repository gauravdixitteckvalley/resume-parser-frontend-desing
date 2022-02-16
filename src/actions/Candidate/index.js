import api from '../../axios';
import handleHttpError,{requestTokenHeader, history, displaySuccessMessage,loginRedirect} from '../../utils/helper';

export const fetchCandidateData = (params) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_CANDIDATE_GET_DATA_REQUEST' });
        try {
            const response = await api.get(`/resume/candidate/${params}`,{
                params  : params,
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_CANDIDATE_GET_DATA_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_CANDIDATE_GET_DATA_FAILURE'});
        }
        
    }
}
/* action for submitting user record */
export const submitCandidateData = (id,postData) => {
    return async dispatch => {
        console.log(id, " action id ",postData,"  action data")
        dispatch({ type: 'SUBMIT_CANDIDATE_FORM_ONE_REQUEST' });
        try {
            let response = '';
            if(id)
                response = await api.put(`resume/candidate/profileSave/${id}`, postData,{ 
                    headers : requestTokenHeader()
                });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_CANDIDATE_FORM_ONE_SUCCESS'});
                displaySuccessMessage(response.data.data.data);
                //let newid=postData.step+1
                if(postData.step==7){
                    history.push(`/candidate/view/${id}`);   
                }else{
                    //newid
                }
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_CANDIDATE_FORM_ONE_FAILURE' });
        }
    }
}
