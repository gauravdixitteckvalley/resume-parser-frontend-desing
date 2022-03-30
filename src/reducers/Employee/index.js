export function employee(state = [], action) {
    
    switch (action.type) {

        case 'SUBMIT_BENCH_EMPLOYEE_REQUEST':
           
            return {
                ...state,
                blocking : true
            };
    
        case 'SUBMIT_BENCH_EMPLOYEE_SUCCESS':
           
            return {
                ...state,
                blocking : false
            };
            
        case 'SUBMIT_BENCH_EMPLOYEE_FAILURE':
           
            return {
                ...state,
                blocking : false
            };  
            
        case 'BENCH_EMPLOYEE_LIST_REQUEST':    
            
            return {
                ...state,
                blocking        : true,
                benchList      : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1
            }

        case 'BENCH_EMPLOYEE_LIST_SUCCESS':    
        
            return {
                ...state,
                blocking        : false,
                benchList       : action.payload.bench_employee,
                totalRecords    : action.payload.total,
                per_page        : action.payload.per_page,
                currentPage     : action.payload.current_page
            }
            
        case 'BENCH_EMPLOYEE_LIST_FAILURE':    
            
            return {
                ...state,
                blocking        : false,
                benchList      : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1
            } 

        case 'UPDATE_EMPLOYEE_STATUS_REQUEST':
            
            return {
                ...state,
                blocking        : true
            }

        case 'UPDATE_EMPLOYEE_STATUS_SUCCESS':
            
            return {
                ...state,
                blocking        : false
            }
            
        case 'UPDATE_EMPLOYEE_STATUS_FAILURE':
            
            return {
                ...state,
                blocking        : false
            }   

        default:
            return state;
    }
}