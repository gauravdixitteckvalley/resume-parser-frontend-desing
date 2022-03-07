import React, { Fragment, useState, useEffect } from "react"
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import BlockUI from "../../components/BlockUI"
import { submitCareerPreferenceAction } from '../../actions/Candidate'
import { getSingleResumeData } from "../../actions/Resume"
import './CareerPreference.css';

const CareerPreference = (props) => {
    const [ fields, setFields ] = useState({ preferredShift: '', jobType:[], empType: []})
    const [ errors, setErrors ] = useState({})
    const [ isCareerResponseFetched , setCareerResponse ] = useState(true)

    //use selector to get candidate store data
    const { resumeDetails, blocking } = useSelector(state => state.resume );

    //fetch user from redux store
    const loggedUser = useSelector(state => state.authenticatedUser);

    const { user } = loggedUser;

    //dispatch function to execute the action
    const dispatch = useDispatch();

    //get url id
    const { id : candidateId} = props.match.params
    

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        dispatch(getSingleResumeData(candidateId))
        
    }, []);

    //set fields value
    if(resumeDetails !== undefined && Object.keys(resumeDetails).length > 0 && isCareerResponseFetched){
        setFields( resumeDetails.careerPreference )
        setCareerResponse(false)
    }

    //handle Change event
    const _handleChange = event => {
        event.preventDefault()
        const { target } = event
        if(target.name === "jobType1" || target.name === "jobType2"){
            if(target.checked === true){
                fields.jobType = [ ...fields.jobType, target.name === "jobType2" ? 'permanent' : 'contractual']
            }else{
                const tragetName = target.name === "jobType2" ? 'permanent' : 'contractual'
                const filteredJobType = fields.jobType.filter( job => {return job !== tragetName })
                fields.jobType = filteredJobType
            }
            
            
        }else if(target.name === "empType"){
            if(target.checked === true){
                fields.empType = [ ...fields.empType, target.value]
            }else{
                const filteredEmpType = fields.empType.filter( job => {return job !== target.value })
                fields.empType = filteredEmpType
            }
        }else{
            fields[target.name] = target.value
        }
        setFields({ ...fields})
    }

    //validate form data
    const _validateForm = () => {
        let error = {};
        let formIsValid = true;

        if (!fields["preferredLoc"] || fields["preferredLoc"].trim() === '') {
            formIsValid = false;
            error["preferredLoc"] = "*Please enter your Preferred Location."
        }

        if (!fields["preferredRole"] || fields["preferredRole"].trim() === '') {
            formIsValid = false;
            error["preferredRole"] = "*Please select your Preferred Role.";
        }

        if (!fields["preferredSal"] || fields["preferredSal"].trim() === '') {
            formIsValid = false;
            error["preferredSal"] = "*Please enter your Preferred Salary.";
        }

        if (!fields["preferredShift"] || fields["preferredShift"].trim() === '') {
            formIsValid = false;
            error["preferredShift"] = "*Please select your Preferred Shift.";
            
        }

        if (!fields["jobType"] || fields["jobType"].length === 0) {
            formIsValid = false;
            error["jobType"] = "*Please select your Job Type.";
        }

        if (!fields["empType"] || fields["empType"].length === 0) {
            formIsValid = false;
            error["empType"] = "*Please select your Employee Type.";
        }
        setErrors(error)
        return formIsValid;
    }
    
    //Submit Career Preference form
    const _onSubmitCareerForm = event => {
        event.preventDefault()
        if(_validateForm()){
            dispatch(submitCareerPreferenceAction(candidateId, {careerPreference: fields, form: "careerPreference"}))
        }
    }

    //statement dynamic form started
    return (
      <Fragment>
        <BlockUI blocking={blocking} />
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row back-btn">
                    <div className="col-md-10 col-sm-12">
                        <h4 className="page-title font-style-bold">
                        Career Preference
                        </h4>
                    </div>
                    <div className="col-md-2 col-md-2">
                        <Link to={user.isCandidateLogin ? `/candidate/view/${candidateId}` : `/candidate/preview/${candidateId}`} rel="noreferrer" className="p-0">
                            <button type="submit" className="btn btn-gradient-primary mb-4">Back</button>
                        </Link>
                    </div>
                </div>
                <hr className="mb-4" />

                <Form onSubmit={ event => _onSubmitCareerForm(event) } className="form-inline edit-form">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="mb-1 required" htmlFor="inlineFormInputName2">
                            Preferred Location
                            </label>
                            <input
                                type="text"
                                name="preferredLoc"
                                className="form-control mb-2 mr-sm-2 col-md-6"
                                id="inlineFormInputName2"
                                placeholder="Preferred Location"
                                onChange={ event => _handleChange(event)}
                                value= { fields?.preferredLoc }
                            />
                            {errors?.preferredLoc ? (
                                <Form.Text style={{ color: "red" }}>
                                { errors?.preferredLoc }
                                </Form.Text>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col-md-6">
                            <label className="mb-1 required" htmlFor="inlineFormInputName2">
                                Preferred Role
                            </label>
                            <input
                                type="text"
                                name="preferredRole"
                                className="form-control mb-2 mr-sm-2 col-md-6"
                                id="inlineFormInputName2"
                                placeholder="Preferred Role"
                                onChange={ event => _handleChange(event)}
                                value= { fields?.preferredRole }
                            />

                            {errors?.preferredRole ? (
                                <Form.Text style={{ color: "red" }}>
                                { errors?.preferredRole }
                                </Form.Text>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="row mt-3">
                    <div className="col-md-6">
                        <label className="mb-1 required" htmlFor="inlineFormInputName2">
                        Preferred Salary
                        </label>
                        <input
                            type="text"
                            name="preferredSal"
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            id="inlineFormInputName2"
                            placeholder="Preferred Salary"
                            onChange={ event => _handleChange(event)}
                            value= { fields?.preferredSal }
                        />

                        {errors?.preferredSal ? (
                            <Form.Text style={{ color: "red" }}>
                            { errors?.preferredSal }
                            </Form.Text>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="col-md-6">
                        <label className="mb-1 required" htmlFor="inlineFormInputName2"> Preferred Shift</label>
                        <div className="Radio-btn">
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="preferredShift"
                                id="inlineRadio1"
                                value="day"
                                onChange={ event => _handleChange(event)}
                                checked={ fields?.preferredShift === "day" }
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">Day</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="preferredShift"
                                id="inlineRadio2"
                                value="night"
                                
                                onChange={ event => _handleChange(event)}
                                checked={ fields?.preferredShift === "night" }
                            />
                            <label className="form-check-label" htmlFor="inlineRadio2">Night</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="preferredShift"
                                id="inlineRadio3"
                                value="flexible"
                                
                                onChange={ event => _handleChange(event)}
                                checked={ fields?.preferredShift === "flexible"}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio3">Flexible</label>
                            </div>
                        </div>

                        {errors?.preferredShift ? (
                            <Form.Text style={{ color: "red" }}>
                            { errors?.preferredShift }
                            </Form.Text>
                        ) : (
                            ""
                        )}
                    </div>
                    </div>
                    <div className="row mt-3">
                    <div className="col-md-6">
                        <label className="mb-1 required" htmlFor="inlineFormInputName2">
                            Job Type
                        </label>
                        <div className="Radio-btn">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="jobType1"
                                    id="inlineRadio1"
                                    checked={ fields?.jobType.some( job => job === "contractual") }
                                    onChange={ event => _handleChange(event)}
                                />
                                <label className="form-check-label" htmlFor="inlineRadio1">Contractual</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="jobType2"
                                    id="inlineRadio2"
                                    checked={ fields?.jobType.some( job => job === "permanent") }
                                    onChange={ event => _handleChange(event)}
                                />
                                <label className="form-check-label" htmlFor="inlineRadio2">Permanent</label>
                            </div>
                        </div>

                        {errors?.jobType ? (
                            <Form.Text style={{ color: "red" }}>
                            { errors?.jobType }
                            </Form.Text>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="col-md-6">
                        <label className="mb-1 required" htmlFor="inlineFormInputName2"> Employement Type</label>
                        <div className="Radio-btn">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="empType"
                                    id="inlineRadio1"
                                    value="FullTime"
                                    
                                    onChange={ event => _handleChange(event)}
                                    checked={ fields?.empType.some( job => job === "FullTime") }
                                />
                                <label className="form-check-label" htmlFor="inlineRadio1">Full time</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="empType"
                                    id="inlineRadio2"
                                    value="PartTime"
                                    
                                    onChange={ event => _handleChange(event)}
                                    checked={ fields?.empType.some( job => job === "PartTime") }
                                />
                                <label className="form-check-label" htmlFor="inlineRadio2">Part time</label>
                            </div>
                        </div>  

                        {errors?.empType ? (
                            <Form.Text style={{ color: "red" }}>
                            { errors?.empType }
                            </Form.Text>
                        ) : (
                            ""
                        )}
                    </div>
                    </div>
                    <button type="submit" className="btn btn-gradient-primary mt-4 mb-2">Submit</button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
}

export default CareerPreference