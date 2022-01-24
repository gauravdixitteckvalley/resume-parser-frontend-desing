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
                statusData      : '',
                topResume       : '' ,
                weeklyResumessubuser:'',
                monthlyResumessubuser:'', 
                totalResumessubuser:''
            }
        
        case 'RESUME_DASHBOARD_SUCCESS':
            return {
                blocking        : false,
                weeklyList      : action.payload.weeklyResumes,
                totalList       : action.payload.totalResumes,
                monthlyList     : action.payload.monthlyResumes,
                statusList      : action.payload.statusList,
                statusData      : action.payload.statusData,
                topResume       : action.payload.topResume,
                weeklyResumessubuser:action.payload.weeklyResumessubuser,
                monthlyResumessubuser:action.payload.monthlyResumessubuser,
                totalResumessubuser:action.payload.totalResumessubuser
            }
        
        case 'RESUME_DASHBOARD_FAILURE':
            return {
                blocking        : false,
                weeklyList      : '',
                totalList       : '',
                monthlyList     : '',
                weeklyResumessubuser:'',
                monthlyResumessubuser:'', 
                totalResumessubuser:'',
                statusList      : '',
                statusData      : '',
                topResume       : ''  
            }

        case 'RESET_DASHBOARD_REQUEST':{
            return {
                blocking        : false,
                weeklyList      : '',
                monthlyList      : '',
                totalList       : '',
                statusList      : '',
                weeklyResumessubuser:'',
                monthlyResumessubuser:'', 
                totalResumessubuser:'',
                statusData      : '',
                topResume       : ''  
            }
        }
        
       default:
            return state;
    }
}