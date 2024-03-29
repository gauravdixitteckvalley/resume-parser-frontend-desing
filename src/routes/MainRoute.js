import React, {lazy} from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import MainLayout from '../pages/MainLayout';
import NotFound from '../pages/NotFound/index';
import {history} from '../utils/helper'
const Login = lazy(() => import('../containers/Login'))
const User = lazy(() => import('../containers/User/UserList'))
const UserForm = lazy(() => import('../containers/User/UserForm'))
const Dashboard = lazy(() => import('../containers/Dashboard'))
const ResumeList = lazy(() => import('../containers/Resume/ResumeList'))
const CandidateDetails = lazy(() => import('../containers/Resume/CandidateDetails'))
const CandidatePreview = lazy(() => import('../containers/Resume/CandidatePreview'))
const AddResume = lazy(() => import('../containers/Resume/AddResume'))
const ManualResume = lazy(() => import('../containers/Resume/ManualResume'))
const Skills = lazy(() => import('../containers/Skill/SkillsList'))
const SkillsForm = lazy(() => import('../containers/Skill/AddSkills'))
const CandidateCommunication = lazy(() => import('../containers/Resume/CandidateCommunication'))
const CandidateDashboard = lazy(() => import('../containers/Candidate/Dashboard'))
const SkillsApproval = lazy(() => import ('../containers/Skill/SkillsApproval'))
const ProfileEdit = lazy(() => import ('../containers/Profile/ProfileForm'))
const Profile = lazy(() => import ('../containers/Profile/Profile'))
const Message = lazy(() => import ('../containers/Message/Message'))
const ChangePassword = lazy(() => import ('../containers/Profile/ChangePassword'))
const ChangePasswordForm = lazy(() => import('../containers/Candidate/CandidateForm/ChangePasswordForm'))


function MainRoute() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/login/candidate" component={Login} />
                <MainLayout>
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/candidate/dashboard" component={CandidateDashboard} />
                        <PrivateRoute exact path="/user" component={User} />
                        <PrivateRoute exact path="/user/create" component={UserForm} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <PrivateRoute exact path="/change-password" component={ChangePassword} />
                        <PrivateRoute exact path="/profile/edit" component={ProfileEdit} />
                        <PrivateRoute exact path="/user/edit/:id" component={UserForm} />
                        <PrivateRoute exact path="/resume" component={ResumeList} />
                        <PrivateRoute exact path="/resume/add" component={AddResume} />
                        <PrivateRoute exact path="/resume/manual/add" component={ManualResume} />
                        <PrivateRoute exact path="/candidate/communication/:id" component={CandidateCommunication} />
                        <PrivateRoute exact path="/candidate/details/:id" component={CandidateDetails} />
                        <PrivateRoute exact path="/candidate/preview/:id" component={CandidatePreview} />
                        <PrivateRoute exact path="/candidate/view/:id" component={CandidatePreview} />
                        <PrivateRoute exact path="/candidate/details/edit/:id" component={CandidateDetails} />
                        <PrivateRoute exact path="/candidate/changepassword/:id" component={ChangePasswordForm} />

                        <PrivateRoute exact path="/skills" component={Skills} />
                        <PrivateRoute exact path="/skills/create" component={SkillsForm} />
                        <PrivateRoute exact path="/skills/approval" component={SkillsApproval} />
                        <PrivateRoute exact path="/skills/edit/:id" component={SkillsForm} />
                        <PrivateRoute exact path="/messages" component={Message} />
                        {/*Page Not Found*/}
                        <Route component={NotFound} />
                    </Switch>
                </MainLayout>
            </Switch>
        </Router>
    )
}

export default MainRoute;
