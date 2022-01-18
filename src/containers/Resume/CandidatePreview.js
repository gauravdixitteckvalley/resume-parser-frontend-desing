import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import BlockUI from "../../components/BlockUI"
import { getSingleResumeData } from "../../actions/Resume"
import { API_URL } from '../../utils/helper';

let base64File = ''
const CandidatePreview = (props) => {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    
    /**fetched data from redux store */
    const resumeData = useSelector(state => state.resume );
    const dispatch = useDispatch();

    const { resumeDetails } = resumeData;    
    
    const getCandidateDetails = async () => {
        dispatch(getSingleResumeData(currentId));
    }

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        getCandidateDetails();
    }, []);

    if(currentId && typeof resumeData != "undefined" && (_.size(resumeData) > 0))
        if (_.size(resumeData.resumeDetails) !== _.size(fields))
            setFields({...resumeData.resumeDetails})

    //const { blocking } = userData
    const blocking = false;
    
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <div className="display-preview">

            <h1 className="display-4 d-none d-sm-block">
                Candidate Preview &nbsp; &nbsp;
                {
                    fields.resumePath ? (<a href={`${API_URL}resume/view/${fields.resumePath}`}
                    className="btn btn-primary" target="_blank" rel="noreferrer">Download</a>)
                    : ('')
                }
                
            </h1>
                  
                <div className="row clearfix mb-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row clearfix">
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Name</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.name || ''}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Email</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.email || ''}
                            </div>
                        </div>
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Phone</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.phone || ''}
                            </div>
                        </div>
                        {
                            fields.skills == null ? (
                            <div className="displayPreviewRow"> 
                                <label className="col-lg-4 col-form-label"><b>S kills</b></label>
                                <div className="col-lg-7 form-group">
                                        {fields.skills || ''}
                                </div>
                            </div>)
                            : ('')
                        }
                        
                        {/* {
                            fields.place ? (<div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>City</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.place || ''}
                            </div>
                        </div>)
                            :('')
                        } */}
                        
                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>City</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.place || ''}
                            </div>
                        </div>

                        <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Company Name</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.workExperience || ''}
                            </div>
                         </div>
                         
                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>D.O.B</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.dob || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Place/Location</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.location || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Total Experience</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.exp || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Designation</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.designation || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Current CTC</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.current_ctc || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Expected CTC</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.expected_ctc || ''}
                            </div>
                         </div>

                         <div className="displayPreviewRow">
                            <label className="col-lg-4 col-form-label"><b>Reaume Label</b></label>
                            <div className="col-lg-7 form-group">
                                    {fields.resume_label || ''}
                            </div>
                         </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CandidatePreview;