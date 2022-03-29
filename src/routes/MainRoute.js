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
const CandidateDetails = lazy(() => import('../containers/Resume/CandidateForm/index'))
const CandidatePreview = lazy(() => import('../containers/Resume/CandidatePreview'))
const AddResume = lazy(() => import('../containers/Resume/AddResume'))
const ManualResume = lazy(() => import('../containers/Resume/CandidateForm/index'))
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
const DeveloperResume = lazy(() => import ('../containers/Resume/CandidateResumePreview/DeveloperResume'))
const DesignerResume = lazy(() => import ('../containers/Resume/CandidateResumePreview/DesignerResume'))
const SelectResume = lazy(() => import ('../containers/Resume/SelectResume/SelectResume'))
const SplashPage = lazy(() => import ('../containers/Splash/Splash'))
const MessageListing = lazy(() => import ('../containers/Message/MessageListing'))
const MessageDetails = lazy(() => import ('../containers/Message/MessageDetails'))
const SentMessageDetails = lazy(() => import ('../containers/Message/SentMessageDetail'))
const SentMessageListing = lazy(() => import ('../containers/Message/SentMessageList'))
const CareerPreference = lazy(() => import ('../containers/Resume/CareerPreference'))
const VideoProfile = lazy(() => import ('../containers/Resume/VideoProfile'))
const ActivityLog = lazy(() => import ('../containers/Resume/ActivityLog/ActivityLog'))
const Notice = lazy(() => import ('../containers/Notice/Notice'))
const Notification = lazy(() => import ('../containers/Notification/Notification'))
const UploadImage = lazy(() => import ('../containers/Resume/UploadImage'))
const JobList = lazy(()=> import ('../containers/Job/JobList'))
const PostJob = lazy(()=> import ('../containers/Job/PostJob'))
const JobDetails = lazy(()=> import ('../containers/Job/JobDetails'))
const BenchCandidate = lazy(()=> import ('../containers/Bench/BenchCandidateList'))
const BenchCandidatePreview = lazy(()=> import ('../containers/Bench/BenchCandidatePreview'))


function MainRoute() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={SplashPage} />
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
                        
                        <PrivateRoute exact path="/message" component={MessageListing} />
                        <PrivateRoute exact path="/message/compose" component={Message} />
                        <PrivateRoute exact path="/message/sent-item" component={SentMessageListing} />
                        <PrivateRoute exact path="/message/message-details/:id" component={MessageDetails} />
                        <PrivateRoute exact path="/sent-message-details/:id" component={SentMessageDetails} />
                        <PrivateRoute exact path="/template/developer-preview" component={DeveloperResume} />
                        <PrivateRoute exact path="/template/designer-preview" component={DesignerResume} />
                        <PrivateRoute exact path="/template" component={SelectResume} />
                        <PrivateRoute exact path="/candidate/view/career-preference/:id" component={CareerPreference} />
                        <PrivateRoute exact path="/candidate/view/video-profile/:id" component={VideoProfile} />
                        <PrivateRoute exact path="/candidate/view/upload-image/:id" component={UploadImage} />
                        <PrivateRoute exact path="/activity-log" component={ActivityLog} />
                        <PrivateRoute exact path="/notices" component={Notice} />
                        <PrivateRoute exact path="/notifications" component={Notification} />
                        <PrivateRoute exact path="/jobs" component={JobList} />
                        <PrivateRoute exact path="/jobs/post-job" component={PostJob} />
                        <PrivateRoute exact path="/jobs/job-details" component={JobDetails} />
                        <PrivateRoute exact path="/bench-candidate-list" component={BenchCandidate} />
                        <PrivateRoute exact path="/bench-candidate-list/bench-candidate-preview" component={BenchCandidatePreview} />
                        {/*Page Not Found*/}
                        <Route component={NotFound} />
                    </Switch>
                </MainLayout>
            </Switch>
        </Router>
    )
}

export default MainRoute;
