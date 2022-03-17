export function activity(state = [], action){
    //console.log("action.payload.data ",action.payload)
    switch (action.type) {
      
        case 'ACTIVITY_LIST_REQUEST':
            return {
                blocking : true,
                 activityList : []
            };
        
        case 'ACTIVITY_LIST_SUCCESS':
            return {
                blocking : false,
                activityList     : action.payload
            };
            
        case 'ACTIVITY_LIST_FAILURE':
            return {
                blocking : true,
                activityList : []
            }; 
            
        default:
            return state;
    }

}