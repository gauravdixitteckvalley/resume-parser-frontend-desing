import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, Card, Button, Row } from "react-bootstrap";
import validator from "validator";
import {  getStateList } from "../../../actions/Resume"


// creating functional component ans getting props from app.js and destucturing them
const StepThree = ({ nextStep, handleFormData, prevStep, values }) => {
   //creating error state for validation
    const [formValues, setFormValues] = useState([ { 
                                    schoolOrCollege: "",
                                    degree: "", 
                                    studyField: "", 
                                    gradMonth: "", 
                                    gradYear: "", 
                                    currentWork: false,
                                    country: "" ,
                                    stateId: null,
                                    stateArray: null,
                                    city: null
                                }])
    const [errors, setErrors] = useState([]);

    //fetch data from store
    const resumeData = useSelector(state => state.resume );
    const { countryList, stateList } = resumeData;
    const dispatch = useDispatch();


    const validateForm = (formValuesArray) => {
        let errors = [];
        let formIsValid = true;
    
        formValuesArray.map ( (fields, index) => {
            let error = {}
            const state = `state${index}`
            if (!fields["schoolOrCollege"] || fields["schoolOrCollege"].trim() === '') {
                formIsValid = false;
                error["schoolOrCollege"] = "*Please enter your School or College.";
            }
        
            if (!fields["degree"] || fields["degree"].trim() === '') {
                formIsValid = false;
                error["degree"] = "*Please select you Degree.";
            }
        
            if (!fields["studyField"] || fields["studyField"].trim() === '') {
                formIsValid = false;
                error["studyField"] = "*Please enter your field of Study.";
            }
        
            if (!fields["gradMonth"] || fields["gradMonth"].trim() === '') {
                formIsValid = false;
                error["gradMonth"] = "*Please select your Graduation Month.";
            }
        
            if (!fields["gradYear"] || fields["gradYear"].trim() === '') {
                formIsValid = false;
                error["gradYear"] = "*Please select your Graduation Year.";
            }
        
            if (!fields["country"] || fields["country"].trim() === '') {
                formIsValid = false;
                error["country"] = "*Please select your Country.";
            }
            
            if (!fields[state] || fields[state].trim() === '') {
                formIsValid = false;
                error[state] = "*Please select your State.";
            }
        
            if (!fields["city"] || fields["city"].trim() === '') {
                formIsValid = false;
                error["city"] = "*Please enter your City.";
            }

            if(Object.keys(error).length > 0){
                errors[index]= error
            }
            
        })
    
        return {
            errors : errors,
            formIsValid : formIsValid
        };
    }

    /* validate form */
    const _validateForm = () => {
        let response = validateForm(formValues);
        setErrors(response.errors)
        return response.formIsValid;
    }

    // after form submit validating the form data using validator
    const submitFormData = (e) => {
        e.preventDefault();

        // validate the fields and then move to next form
        if (_validateForm()){
            nextStep()
        }
    };

    const _handleChange = (event,key ) => {
        const { target } = event
        const state = `state${key}`
        if(target.name  === state){
            const splitValue = target.value.match(/^(\S+)\s(.*)/).slice(1)
            formValues[key][state] = splitValue[1]
            formValues[key].stateId = splitValue[0]
            formValues[key].stateArray = stateList
            formValues[key].isStateFilled = true
        }else if(target.name === "currentWork"){
            formValues[key].currentWork = target.value === "on" ? "off" : "on"
        }else{
            formValues[key][target.name] = target.value
        }
        if(target.name === 'country'){
            if(formValues[key].stateArray !== null){
                formValues[key].stateName = ""
                formValues[key].stateId = null
                formValues[key].stateArray = null
                formValues[key].isStateFilled = false
            }
            let countryid = target.value;
            dispatch(getStateList(countryid));    
        }
        setFormValues([...formValues])
    }

    const selectStateOrCountryOption = (formValues, optionsArray, formValuesKey) => {
        const stateName = `state${formValuesKey}`
        if(formValues[formValuesKey].isStateFilled){
            const resumeListSelectedCountry = formValues[formValuesKey].stateArray
            return resumeListSelectedCountry.map ( (state, index) => {
                return (
                    <>
                        <option key={index + formValuesKey} value={ formValues[formValuesKey][stateName] !== "" ? formValues[formValuesKey][stateName] === state.name ? 'selected' : `${state._id} ${state.name}` : `${state._id} ${state.name}` }>{state.name}</option>
                    </>
                )
        })
        }else{
            if(formValues[formValuesKey].country !== ""){
            return optionsArray.map ( (state, index) => {
                return (
                    <>
                        <option key={index + formValuesKey} value={ `${state._id} ${state.name}` }>{state.name}</option>
                    </>
                )
            })
            
            }
        
        }
        
    }

    //add form fields object
    const addFormFields = () => {
        setFormValues([...formValues, { 
                                        schoolOrCollege: "",
                                        degree: "", 
                                        studyField: "", 
                                        gradMonth: "", 
                                        gradYear: "", 
                                        currentWork: false,
                                        country: "" ,
                                        stateId: null,
                                        stateArray: null,
                                        city: null
                                    }])
    }

    return (
        <>
        <Card>
            <Card.Body>
            <h3 className="page-title font-style-bold mb-2">EDUCATION </h3>
            <p style={{fontSize: '13px'}}>Add more about your educational background.</p>
            <Form onSubmit={submitFormData} className="mt-4">
                {formValues.map((index, key) => {
                    return (
                        <div key={key}>
                            <Row>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>School/College Name</Form.Label>
                                    <Form.Control
                                        style={{ border: errors[key]?.schoolOrCollege ? "2px solid red" : "" }}
                                        type="text"
                                        name="schoolOrCollege"
                                        placeholder="School/College Name"
                                        onChange={ (event) => _handleChange(event, key) }
                                    />
                                    {errors[key]?.schoolOrCollege ? (
                                        <Form.Text style={{ color: "red" }}>
                                        { errors[key]?.schoolOrCollege }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group> 
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Select a degree</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        style={{ border: errors[key]?.schoolOrCollege ? "2px solid red" : "" }} 
                                        name="degree" 
                                        defaultValue={values.degree} 
                                        onChange={ (event) => _handleChange(event, key) }
                                    >
                                        <option>Select a degree</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                    {errors[key]?.schoolOrCollege ? (
                                        <Form.Text style={{ color: "red" }}>
                                            { errors[key]?.schoolOrCollege }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>                     
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select aria-label="Default select example" 
                                        name="country" 
                                        style={{ border: errors[key]?.country ? "2px solid red" : "" }}
                                        onChange={(event) => _handleChange(event,key)}
                                    >
                                        <option value="">Select Country</option>
                                        
                                        {countryList?.map((country, index) => (
                                            <option key={index + key} value={country._id}>{country.name}</option>
                                        ))}
                                    </Form.Select>
                                    {errors[key]?.country ? (
                                        <Form.Text style={{ color: "red" }}>
                                            { errors[key]?.country }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        style={{ border: errors[key]?.[`state${key}`] ? "2px solid red" : "" }} 
                                        name={ `state${key}` } 
                                        onChange={ (event) => _handleChange(event, key) } 
                                    >
                                        <option>Open this select menu</option>

                                        { selectStateOrCountryOption(formValues, stateList, key)}

                                    </Form.Select>
                                    {errors[key]?.[`state${key}`] ? (
                                        <Form.Text style={{ color: "red" }}>
                                            { errors[key]?.[`state${key}`] }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        style={{ border: errors[key]?.city ? "2px solid red" : "" }}
                                        name="city" 
                                        type="text"
                                        defaultValue={values.city} 
                                        onChange={(event) => _handleChange(event, key)}
                                    />
                                    {errors[key]?.city ? (
                                        <Form.Text style={{ color: "red" }}>
                                            { errors[key]?.city }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group> 
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-6">
                                        <Form.Label>Field of study</Form.Label>
                                            <Form.Control
                                            style={{ border: errors[key]?.studyField ? "2px solid red" : "" }}
                                            type="text"
                                            name="studyField"
                                            placeholder="eg. Engineering"
                                            onChange={ (event) => _handleChange(event, key) }
                                            />
                                        {errors[key]?.studyField ? (
                                            <Form.Text style={{ color: "red" }}>
                                                { errors[key]?.studyField }
                                            </Form.Text>
                                        ) : (
                                            ""
                                        )}
                                </Form.Group>  
                                <Form.Group className="mb-2 col-md-6">
                                    <Row>
                                    <Form.Group className="mb-2 col-md-6">
                                        <Form.Label>Graduation month</Form.Label>
                                        <Form.Select 
                                            aria-label="Default select example" 
                                            style={{ border: errors[key]?.gradMonth ? "2px solid red" : "" }} 
                                            name="gradMonth" 
                                            defaultValue={values.gradMonth} 
                                            onChange={ (event) => _handleChange(event, key) }
                                        >
                                            <option>Month</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                        {errors[key]?.gradMonth ? (
                                            <Form.Text style={{ color: "red" }}>
                                                { errors[key]?.gradMonth }
                                            </Form.Text>
                                        ) : (
                                            ""
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-2 col-md-6">
                                        <Form.Label>Graduation year</Form.Label>
                                        <Form.Select 
                                            aria-label="Default select example" 
                                            style={{ border: errors[key]?.gradYear ? "2px solid red" : "" }} 
                                            name="gradYear" 
                                            defaultValue={values.gradYear} 
                                            onChange={ (event) => _handleChange(event, key) }
                                        >
                                            <option>Year</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                        {errors[key]?.gradYear ? (
                                            <Form.Text style={{ color: "red" }}>
                                                { errors[key]?.gradYear }
                                            </Form.Text>
                                        ) : (
                                            ""
                                        )}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Check 
                                            aria-label="Default select example" 
                                            type="checkbox" 
                                            className="my-check mt-1" 
                                            label="I presently attend here" 
                                            name="currentWork" 
                                            checked= {formValues[key].currentWork}
                                            onChange={ (event) => _handleChange(event, key) } 
                                        />
                                    </Form.Group>
                                    </Row>
                                </Form.Group>  
                            </Row>
                            
                            <hr className="mb-4"/> 
                        </div>
                    )
                })}
                
                <Row>
                <Form.Group className="mb-2 col-md-6">

                </Form.Group>
                <Form.Group className="mb-2 col-md-6" style={{textAlign: 'right'}}>
                    <Button className= "btn btn-gradient-primary btn-icon-text" onClick={() => addFormFields()} type="button">
                    <span className="page-title-icon text-white me-2">
                        <i className="mdi mdi-plus-box"></i>
                    </span>
                        Add More
                    </Button>
                </Form.Group>
                
                </Row>
                <hr className="mb-4"/>
                
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit" onClick={prevStep} >
                    Previous
                </Button>

                <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit" >
                    Next
                </Button>
                </div>
            </Form>
            </Card.Body>
        </Card>
        </>
    );
};

export default StepThree;