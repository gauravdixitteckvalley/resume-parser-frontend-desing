export function candidate(state = [], action) {
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
                blocking : true
            };
        
        case 'SUBMIT_CANDIDATE_FORM_ONE_SUCCESS':
            return {
                blocking : false
            };
        
        case 'SUBMIT_CANDIDATE_FORM_ONE_FAILURE':
            return {
                blocking : false,
            };
        
        case 'CHANGE_LOGGED_CANDIDATE_DATA':
            return [];

        default:
            return state;
    }
}