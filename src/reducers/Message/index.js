export function message(state = [], action){
    
    switch (action.type) {
      
        case 'USER_LIST_REQUEST':
            return {
                blocking : true,
                userList : []
            };
        
        case 'USER_LIST_SUCCESS':
            return {
                blocking : false,
                userList : action.payload.user
            };
            
        case 'USER_LIST_FAILURE':
            return {
                blocking : true,
                userList : []
            }; 

        case 'SUBMIT_MESSAGE_REQUEST':
            return {
                ...state,
                blocking : true
            };
        
        case 'SUBMIT_MESSAGE_SUCCESS':
            
            return {
                ...state,
                blocking : false
            };
            
        case 'SUBMIT_MESSAGE_FAILURE':
            return {
                blocking : true
            };

        case 'MESSAGE_LIST_REQUEST':
            return {
                blocking : true,
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
                messageList : []
            };
        
        case 'MESSAGE_LIST_SUCCESS':
            return {
                blocking : false,
                totalRecords    : action.payload.total,
                per_page        : action.payload.per_page,
                currentPage     : action.payload.current_page,
                messageList     : action.payload.message
            };
            
        case 'MESSAGE_LIST_FAILURE':
            return {
                blocking : true,
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
                messageList : []
            }; 
            
 
        case 'MESSAGE_DETAIL_REQUEST':
            return {
                ...state,
                blocking : true,
                messageDetail : []
            };
        
        case 'MESSAGE_DETAIL_SUCCESS':
            return {
                ...state,
                blocking : false,
                messageDetail     : action.payload.message
            };
            
        case 'MESSAGE_DETAIL_FAILURE':
            return {
                blocking : true,
                messageDetail : []
            }; 
            
        case 'SENT_MESSAGE_LIST_REQUEST':
            return {
                blocking : true,
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
                sentMessageList : []
            };
        
        case 'SENT_MESSAGE_LIST_SUCCESS':
            return {
                blocking : false,
                totalRecords    : action.payload.total,
                per_page        : action.payload.per_page,
                currentPage     : action.payload.current_page,
                sentMessageList : action.payload.message
            };
            
        case 'SENT_MESSAGE_LIST_FAILURE':
            return {
                blocking : true,
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
                sentMessageList : []
            };             
        default:
            return state;
    }

}