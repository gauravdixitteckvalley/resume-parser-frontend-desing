import api from '../../axios';
import handleHttpError,{requestTokenHeader, history, displaySuccessMessage, displayMessageWithSwitchCase } from '../../utils/helper';

export const fetchCandidateData = (params) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_CANDIDATE_GET_DATA_REQUEST' });
        try {
            const response = await api.get(`/resume/candidate/${params}`,{
                // params  : params,
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
                displayMessageWithSwitchCase(postData.step)
                
                if(postData.step===8){
                    history.push(`/candidate/view/${id}`);   
                }
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_CANDIDATE_FORM_ONE_FAILURE' });
        }
    }
}

/* action for submitting career preference of candidates */
export const submitCareerPreferenceAction = (id, postData) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_CANDIDATE_CAREER_PREFERENCE_REQUEST' });
        try {
            let response = await api.put(`resume/candidate/profileSave/${id}`, postData,{ 
                                headers : requestTokenHeader()
                            });
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_CANDIDATE_CAREER_PREFERENCE_SUCCESS'});
                displaySuccessMessage(response.data.data.message)
                setTimeout(() => {
                    const authenticateUser = JSON.parse(localStorage.getItem('data'));
                    const { isCandidateLogin } = authenticateUser;
                    const redirectTo = isCandidateLogin? `/candidate/view/${id}` : `/candidate/preview/${id}`;
                    history.push(redirectTo);  
                }, 1000);
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_CANDIDATE_CAREER_PREFERENCE_FAILURE' });
        }
    }
}

/* action for submitting career preference of candidates */
export const submitVideoProfileAction = (id, postData) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_CANDIDATE_VIDEO_PROFILE_REQUEST' });
        try {
            let response = await api.put(`resume/candidate/videoProfileCandidate/${id}`, postData,{ 
                                headers : requestTokenHeader()
                            });
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_CANDIDATE_VIDEO_PROFILE_SUCCESS'});
                displaySuccessMessage(response.data.data.message)
                setTimeout(() => {
                    history.push(`/candidate/view/${id}`); 
                }, 1000);
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_CANDIDATE_VIDEO_PROFILE_FAILURE' });
        }
    }
}

/* action for submitting manual resume record */
export const submitManualResumeFormData = (postData) => {
    return async dispatch => {
        
        dispatch({ type: 'SUBMIT_MANUAL_RESUME_FORM_REQUEST' });
        try {
            let response = await api.post(`resume/manual`, postData, {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_MANUAL_RESUME_FORM_SUCCESS', payload :response.data.data.candidateId });
                displaySuccessMessage(response.data.data.message);
                console.log("response.data.data ",response.data.data)
                // history.push('/resume');
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_MANUAL_RESUME_FORM_FAILURE' });
            console.log(error , " error")
        }
    }
}
/* action for update resume recode */
export const updateProfileImage = (id, postData) => {
    return async dispatch => {
        dispatch({ type: 'UPDATE_IMAGE_REQUEST' });
        try {
            let response = await api.put(`/resume/candidate/profileImageUpload/${id}`, postData, {
                headers : requestTokenHeader(),
            });
           
            if (response.data.success) {
                dispatch({ type : 'UPDATE_IMAGE_SUCCESS'});
                const { message } = response.data.data
                displaySuccessMessage(message);
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'UPDATE_IMAGE_FAILURE' });
        }
    }
}

export const fetchSkillsList = postData => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_SKILLS_REQUEST' });
        try {
            let response = await api.post(`/resume/skillsOnSearch`, postData, {
                headers : requestTokenHeader(),
            });
           
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_SKILLS_SUCCESS', payload: response.data.data});

            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_SKILLS_FAILURE' });
        }
    }
}