export function job(state = [], action) {
    switch (action.type) {
        /* cases for submit form starts */
        case 'SUBMIT_JOB_POST_REQUEST':
           
            return {
                ...state,
                jobPostInfo        : {},
                blocking : true
            };
        
        case 'SUBMIT_JOB_POST_SUCCESS':
            return {
                ...state,
                jobPostInfo     : action.payload.postJob,
                blocking : false
            };
        
        case 'SUBMIT_JOB_POST_FAILURE':
            return {
                jobPostInfo        : {},
                blocking : false,
            };


        /* cases for listing of user starts */
        case 'POSTED_JOBS_LIST_REQUEST':
            return {
                blocking        : true,
                jobPostedList        : [],
                // totalRecords    : 0,
                // per_page        : 0,
                // currentPage     : 1,
            }
        
        case 'POSTED_JOBS_LIST_SUCCESS':
            return {
                blocking        : false,
                jobPostedList      : action.payload.data.postedJobList,
                // totalRecords    : action.payload.total,
                // per_page        : action.payload.per_page,
                // currentPage     : action.payload.current_page,
            }
        
        case 'POSTED_JOBS_LIST_FAILURE':
            return {
                blocking        : false,
                jobPostedList   : [],
                // totalRecords    : 0,
                // per_page        : 0,
                // currentPage     : 1,
            }
       

        default:
            return state;
    }
}