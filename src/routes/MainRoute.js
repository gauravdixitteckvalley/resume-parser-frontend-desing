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


function MainRoute() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <MainLayout>
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/user" component={User} />
                        <PrivateRoute exact path="/user/create" component={UserForm} />
                        <PrivateRoute exact path="/user/edit/:id" component={UserForm} />
                        <PrivateRoute exact path="/resume" component={ResumeList} />
                        <PrivateRoute exact path="/resume/add" component={AddResume} />
                        <PrivateRoute exact path="/resume/manual/add" component={ManualResume} />
                        <PrivateRoute exact path="/candidate/communication/:id" component={CandidateCommunication} />
                        <PrivateRoute exact path="/candidate/details/:id" component={CandidateDetails} />
                        <PrivateRoute exact path="/candidate/preview/:id" component={CandidatePreview} />

                        <PrivateRoute exact path="/skills" component={Skills} />
                        <PrivateRoute exact path="/skills/create" component={SkillsForm} />
                        <PrivateRoute exact path="/skills/edit/:id" component={SkillsForm} />
                        {/*Page Not Found*/}
                        <Route component={NotFound} />
                    </Switch>
                </MainLayout>
            </Switch>
        </Router>
    )
}

export default MainRoute;
