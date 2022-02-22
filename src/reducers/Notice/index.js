export function notice(state = [], action){
    // console.log(action, 'action');
    switch (action.type) {
        
        
        case 'SUBMIT_NOTICE_REQUEST':
            return {
                ...state,
                blocking : true
            };
        
        case 'SUBMIT_NOTICE_SUCCESS':
            return {
                ...state,
                blocking : false
            };
            
        case 'SUBMIT_NOTICE_FAILURE':
            return {
                blocking : true
            };

        case 'NOTICE_LIST_REQUEST':
            return {
                blocking : true,
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
                noticeList : []
            };
        
        case 'NOTICE_LIST_SUCCESS':
            return {
                blocking : false,
                totalRecords    : action.payload.total,
                per_page        : action.payload.per_page,
                currentPage     : action.payload.current_page,
                noticeList     : action.payload.notice
            };
            
        case 'NOTICE_LIST_FAILURE':
            return {
                blocking : true,
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
                noticeList : []
            }; 
            
        case 'NOTICE_USER_LIST_REQUEST':
            return {
                blocking : true,
                userList : []
            };
        
        case 'NOTICE_USER_LIST_SUCCESS':
            return {
                blocking : false,
                userList : action.payload.user
            };
            
        case 'NOTICE_USER_LIST_FAILURE':
            return {
                blocking : true,
                userList : []
            };  
        case 'NOTICE_DETAIL_REQUEST':
            return {
                blocking : true,
                noticeDetail : {}
            };
        
        case 'NOTICE_DETAIL_SUCCESS':
            return {
                blocking : false,
                noticeDetail : action.payload.message
            };
            
        case 'NOTICE_DETAIL_FAILURE':
            return {
                blocking : true,
                noticeDetail : {}
            };                       
        default:
            return state;
    }

}