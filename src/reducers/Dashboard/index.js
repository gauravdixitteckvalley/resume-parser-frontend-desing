export function dashboard(state = [], action) {
    switch (action.type) {
        /* cases for listing of resume starts */
        case 'RESUME_DASHBOARD_REQUEST':
            return {
                blocking        : true,
                weeklyList      : '',
                monthlyList     : '',
                totalList       : '',
                statusList      : '',
                statusData     : ''
            }
        
        case 'RESUME_DASHBOARD_SUCCESS':
            return {
                blocking        : false,
                weeklyList      : action.payload.weeklyResumes,
                totalList       : action.payload.totalResumes,
                monthlyList     : action.payload.monthlyResumes,
                statusList      : action.payload.statusList,
                statusData       : action.payload.statusData
            }
        
        case 'RESUME_DASHBOARD_FAILURE':
            return {
                blocking        : false,
                weeklyList      : '',
                totalList       : '',
                monthlyList     : '',
                statusList      : '',
                statusData     : ''
            }

        case 'RESET_DASHBOARD_REQUEST':{
            return {
                blocking        : false,
                weeklyList      : '',
                monthlyList      : '',
                totalList       : '',
                statusList      : '',
                statusData     : ''
            }
        }
        
       default:
            return state;
    }
}