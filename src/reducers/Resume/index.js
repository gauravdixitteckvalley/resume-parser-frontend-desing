export function resume(state = [], action) {
    switch (action.type) {
        /* cases for listing of resume starts */
        case 'RESUME_LIST_REQUEST':
            return {
                blocking        : true,
                resumeList      : [],
                definedSkills   : [],
                applicant_status : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
                statusList      : []
            }
        
        case 'RESUME_LIST_SUCCESS':
        
            return {
                blocking        : false,
                resumeList      : action.payload.resumes,
                definedSkills   : action.payload.skills,
                applicant_status : action.payload.applicant_status,
                totalRecords    : action.payload.total,
                per_page        : action.payload.per_page,
                currentPage     : action.payload.current_page,
                statusList      : action.payload.candidateStatusList
            }
            
        
        case 'RESUME_LIST_FAILURE':
            return {
                blocking        : false,
                resumeList      : [],
                definedSkills   : [],
                applicant_status : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
                statusList      : []
            }

        /* cases for submit form starts */
        case 'SUBMIT_RESUME_FORM_REQUEST':
            return {
                blocking : true
            };
        
        case 'SUBMIT_RESUME_FORM_SUCCESS':
            return {
                blocking : false
            };
        
        case 'SUBMIT_RESUME_FORM_FAILURE':
            return {
                blocking : false,
            };

        /* cases for manual submit form starts */
        case 'SUBMIT_MANUAL_RESUME_FORM_REQUEST':
            return {
                blocking : true
            };
        
        case 'SUBMIT_MANUAL_RESUME_FORM_SUCCESS':
            return {
                blocking : false
            };
        
        case 'SUBMIT_MANUAL_RESUME_FORM_FAILURE':
            return {
                blocking : false,
            };

        case 'RESET_RESUME_DATA':
            return [];

        case 'DELETE_RESUME_ON_REMOVE':
            return {
                blocking : false,
            };

        case 'SINGLE_RESUME_GET':
            return {
                blocking       : true,
                resumeDetails  : [],
                countryList    : [],
                stateList      : [],
                cityList       : []
            }
        case 'GET_RESUME_DATA_SUCCESS':
            return {
                blocking        : false,
                resumeDetails   : action.payload.candidate,
                countryList     : action.payload.country,
                stateList       : action.payload.state,
                cityList        : action.payload.city
            }
        case 'GET_RESUME_DATA_FAILURE':
            return {
                blocking        : false,
                resumeDetails   : [],
                countryList     : [],
                stateList       : [],
                cityList        : []
            }

        case 'UPDATE_RESUME_FORM_REQUEST':
            return{
                blocking : true
            }
        case 'UPDATE_RESUME_FORM_SUCCESS':
            return {
                blocking : false
            };
        
        case 'UPDATE_RESUME_FORM_FAILURE':
            return {
                blocking : false,
            };

        case 'GET_RESUME_COMMUNICATION_REQUEST':
            return {
                blocking : true,
                resumeCommunication:[]
            };   

        case 'GET_RESUME_COMMUNICATION_SUCCESS':
            return {
                blocking : false,
                resumeCommunication:action.payload
            };   

        case 'GET_RESUME_COMMUNICATION_FAILURE':
            return {
                blocking : false,
                resumeCommunication:[]
            };   
    
        case 'SUBMIT_RESUME_NOTE_REQUEST':
            return {
                blocking : true
            };
        
        case 'SUBMIT_RESUME_NOTE_SUCCESS':
            return {
                blocking : false
            };
        
        case 'SUBMIT_RESUME_NOTE_FAILURE':
            return {
                blocking : false,
            };  

        case 'GET_COUNTRY_REQUEST':
            return {
                blocking : true,
                countryList:[]
            };
        
        case 'GET_COUNTRY_SUCCESS':
            
            return {
                blocking : false,
                countryList:action.payload.country
            };
            
        case 'GET_COUNTRY_FAILURE':
            return {
                blocking : false,
                countryList:[]
            }; 

        case 'GET_STATE_REQUEST':
            return {
                ...state,
                blocking : true,
                stateList:[]
            };
        
        case 'GET_STATE_SUCCESS':
            
            return {
                ...state,
                blocking : false,
                stateList:action.payload.state
            };
            
        case 'GET_STATE_FAILURE':
            return {
                ...state,
                blocking : false,
                stateList:[]
            };  
        
        case 'SEND_MAIL_REQUEST':
            return {
                ...state,
                blocking        : true,                    
            }
        
        case 'SEND_MAIL_SUCCESS':
        
            return {
                ...state,
                blocking        : false,                    
            }
        
        case 'SEND_MAIL_FAILURE':
            return {
                ...state,
                blocking        : false,                   
            }

        case 'SEND_MULTIPLE_MAIL_REQUEST':
            return {
                ...state,
                blocking        : true,                    
            }
        
        case 'SEND_MULTIPLE_MAIL_SUCCESS':
        
            return {
                ...state,
                blocking        : false,                    
            }
        
        case 'SEND_MULTIPLE_MAIL_FAILURE':
            return {
                ...state,
                blocking        : false,                   
            }

        /* cases for delete resume */
        case 'DELETE_RESUME_REQUEST':
            return {
                ...state,
                blocking        : true,
            };
        
        case 'DELETE_RESUME_SUCCESS':
            return {
                ...state,
                blocking    : false,
                resumeList    : action.payload,
            };
        
        case 'DELETE_RESUME_FAILURE':
            return {
                blocking : false
            };
        case 'SUBMIT_CHANGE_PASSWORD_REQUEST':
            return {
                blocking : true
            };
        
        case 'SUBMIT_CHANGE_PASSWORD_SUCCESS':
            return {
                blocking : false
            };
        
        case 'SUBMIT_CHANGE_PASSWORD_FAILURE':
            return {
                blocking : false,
            };    
/* ================== file upload ================ */
            case 'UPDATE_RESUME_REQUEST':
                return{
                    blocking : true
                }
            case 'UPDATE_RESUME_SUCCESS':
                return {
                    blocking : false
                };
            
            case 'UPDATE_RESUME_FAILURE':
                return {
                    blocking : false,
                };
    
        default:
            return state;
    }
}