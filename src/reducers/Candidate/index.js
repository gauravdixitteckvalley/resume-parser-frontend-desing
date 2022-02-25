export function candidate(state = [], action) {
    console.log(action, " Candidate Action ")
    switch (action.type) {
        /* cases for submit form starts */
        case 'SUBMIT_CANDIDATE_GET_DATA_REQUEST':
           
            return {
                candidateInfo        : {},
                blocking : true
            };
        
        case 'SUBMIT_CANDIDATE_GET_DATA_SUCCESS':
            return {
                candidateInfo     : action.payload.candidate,
                blocking : false
            };
        
        case 'SUBMIT_CANDIDATE_GET_DATA_FAILURE':
            return {
                candidateInfo        : {},
                blocking : false,
            };
   

        /* cases change password for submit form starts */
        case 'SUBMIT_CANDIDATE_FORM_ONE_REQUEST':
            return {
                ...state,
                blocking : true
            };
        
        case 'SUBMIT_CANDIDATE_FORM_ONE_SUCCESS':
            return {
                ...state,
                blocking : false
            };
        
        case 'SUBMIT_CANDIDATE_FORM_ONE_FAILURE':
            return {
                blocking : false,
            };
        
        case 'CHANGE_LOGGED_CANDIDATE_DATA':
            return [];

        case 'SUBMIT_CANDIDATE_CAREER_PREFERENCE_REQUEST':
        case 'SUBMIT_CANDIDATE_VIDEO_PROFILE_REQUEST':
            return {
                blocking: true
            }
        case 'SUBMIT_CANDIDATE_CAREER_PREFERENCE_SUCCESS':
        case 'SUBMIT_CANDIDATE_VIDEO_PROFILE_SUCCESS':    
            return {
                blocking: false
            }
        case 'SUBMIT_CANDIDATE_CAREER_PREFERENCE_FAILURE':
        case 'SUBMIT_CANDIDATE_VIDEO_PROFILE_FAILURE':
            return {
                blocking: true
            }

        /* ================== image upload ================ */
        case 'UPDATE_IMAGE_REQUEST':
            return{
                blocking : true
            }
        case 'UPDATE_IMAGE_SUCCESS':
            return {
                blocking : false
            };
        
        case 'UPDATE_IMAGE_FAILURE':
            return {
                blocking : false,
            };

        default:
            return state;
    }
}