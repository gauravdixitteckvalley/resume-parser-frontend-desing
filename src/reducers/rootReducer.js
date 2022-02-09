import { combineReducers } from 'redux';

import { authenticatedUser } from './Login';
import { user } from './User';
import { resume } from './Resume';
import { skills } from './Skills';
import { dashboard } from './Dashboard';
import { profile } from "./Profile";
import { candidate } from "./Candidate";

const rootReducer = combineReducers({
    authenticatedUser,
    user,
    profile,
    resume,
    skills,
    dashboard,
    candidate,
});

export default rootReducer;