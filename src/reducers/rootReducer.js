import { combineReducers } from 'redux';

import { authenticatedUser } from './Login';
import { user } from './User';
import { resume } from './Resume';
import { skills } from './Skills';
import { dashboard } from './Dashboard';

const rootReducer = combineReducers({
    authenticatedUser,
    user,
    resume,
    skills,
    dashboard,
});

export default rootReducer;