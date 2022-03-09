import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Card, Button, Row } from "react-bootstrap";
import validator from "validator";
import _ from "lodash";

import {  getStateList } from "../../../actions/Resume"
import { displayErrorMessage } from '../../../utils/helper';
import {  submitCandidateData  } from "../../../actions/Candidate";

// creating functional component ans getting props from app.js and destucturing them
const StepThree = (props,{ nextStep, handleFormData, prevStep, values }) => {
   //creating error state for validation
    const [formValues, setFormValues] = useState([])
    const [errors, setErrors] = useState([]);
    const d = new Date();
    let currentYear = d.getFullYear();
    let oldYear = 1950;
    
    let years = [];
    //fetch data from store
    const resumeData = useSelector(state => state.resume );
    const { countryList, stateList } = resumeData;
    const currentId = props.cdId;
    const dispatch = useDispatch();
    const [formValuesLength,setFormValuesLength] = useState('')
    let months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    useEffect(() => {

        if(!_.isEmpty(props?.handleFormData)){
            let string  = false ;
            let  propsData =  props.handleFormData.education;
            propsData.map((ppData)=>{
                if(typeof(ppData) == 'string'){
                    string = true 
                }
            }) 
            if(props?.handleFormData?.education?.length >0 && string === false ){
                setFormValues(props.handleFormData.education)
                setFormValuesLength(props.handleFormData.education.length)
            }
            else if(formValues.length === 0){
                setFormValues([...formValues, { 
                    schoolOrCollege: "",
                    degree: "", 
                    studyField: "", 
                    gradMonth: "", 
                    gradYear: "", 
                    presentAttend: false,
                    country: "" ,
                    stateId: null,
                    stateArray: null,
                    city: ''
                }])
            }
        }
            
    }, []);

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
            if(fields["presentAttend"] == false){
                if (!fields["gradMonth"] || fields["gradMonth"].trim() === '') {
                    if(fields["presentAttend"] === false){
                        formIsValid = false;
                        error["gradMonth"] = "*Please select your Graduation Month.";
                    }
                    
                }
            
                if (!fields["gradYear"] || fields["gradYear"].trim() === '') {
                    if(fields["presentAttend"] === false){
                        formIsValid = false;
                        error["gradYear"] = "*Please select your Graduation Year.";
                    }
                }
            }else{
                error["gradMonth"] = "";
                error["gradYear"] = "";
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

    /* Checking is there any present attend here or not */
   /* const _isPresentlyAttendChecked = () => {
        let count = 0
        formValues.map( (data) => {
            if(data.presentAttend === true){
                count = count + 1
            }
        })
        if(count === 0){
            displayErrorMessage('Please select your present attend')
            return false
        }
        return true
    }
    */

    // after form submit validating the form data using validator
    const submitFormData = (e) => {
        e.preventDefault();
        let postData = formValues;
        // validate the fields and then move to next form
        //if (_validateForm() && _isPresentlyAttendChecked()){
        if (_validateForm()){
            if(currentId){
                dispatch(submitCandidateData(currentId, {education:postData,step:3}));
                setTimeout(function(){  props.nextStep(); }, 2000);
            }
        }
    };

    const _handleChange = (event,key ) => {
        const { target } = event
        const state = `state${key}`
        if(target.name  === state){
            const splitValue = target.value.match(/^(\S+)\s(.*)/).slice(1)
            formValues[key][state] = splitValue[1]
            formValues[key].stateId = splitValue[0]
            if(formValues[key].isStateFilled === false){
                formValues[key].stateArray = stateList
                formValues[key].isStateFilled = true
            }
            
            
        }
        else if(target.name === "presentAttend"){
            formValues[key][target.name] = target.checked
            if(formValues.length > 0){
                formValues.map( (data, index) => {
                    if(index !== key && formValues[index][target.name] === true){
                        formValues[index][target.name] = false
                    }
                })
            }
        }
        else{
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

    const selectStateOrCountryOption = (formValues, optionsArray, formValuesKey,selectedState) => {
        const stateName = `state${formValuesKey}`
        if(formValues[formValuesKey].isStateFilled){
            const resumeListSelectedCountry = formValues[formValuesKey].stateArray
            return resumeListSelectedCountry.map ( (state, index) => {
                return (
                    <Fragment key={`with-selecting${index}`} >
                        <option
                            value={  `${state._id} ${state.name}` }
                            >{state.name}
                        </option>
                    </Fragment>
                )
        })
        }else{
            if(formValues[formValuesKey].country !== ""){
            return optionsArray.map ( (state, index) => {
                return (
                    <Fragment key={`without-selecting${index + formValuesKey}`} >
                        <option 
                            value={ `${state._id} ${state.name}` }
                            >{state.name}
                        </option>
                    </Fragment>
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
                                        presentAttend: false,
                                        country: "" ,
                                        stateId: null,
                                        stateArray: null,
                                        city: ''
                                    }])
                                    setFormValuesLength(formValuesLength + 1);
    }

    //removing formValues object
    const removeFormFields = (event, index) => {
        event.preventDefault()
    
        if(errors !== false){
          let newErrors = [...errors];
          newErrors.splice(index, 1);
          setFormValues(newErrors)
        }
    
        let newFormValues = [...formValues];
        newFormValues.splice(index, 1);
        setFormValues(newFormValues)
        setFormValuesLength(formValuesLength - 1);
    }

    if(years.length === 0){
        for(let i = oldYear; i <= currentYear; i++){
            years.push(i);
        }
    }

    return (
        <>
        <Card>
            <Card.Body>
            <h3 className="page-title font-style-bold mb-2">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-checkbox-marked"></i>
                </span>
                EDUCATION 
            </h3>
            <p style={{fontSize: '13px'}}>Add more about your educational background.</p>
            <Form onSubmit={submitFormData} className="mt-4">
                {formValues?.map((index, key) => {
                    const stateName = `state${key}`
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
                                        value={index?.schoolOrCollege}
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
                                    <Form.Label>Degree</Form.Label>
                                    <Form.Control
                                        style={{ border: errors[key]?.schoolOrCollege ? "2px solid red" : "" }}
                                        type="text"
                                        name="degree" 
                                        placeholder="Enter your degree"
                                        value={index?.degree}
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
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select aria-label="Default select example" 
                                        name="country" 
                                        style={{ border: errors[key]?.country ? "2px solid red" : "" }}
                                        onChange={(event) => _handleChange(event,key)}
                                        value={index?.country }
                                    >
                                        <option value="">Select Country</option>
                                        
                                        {countryList?.map((country, index2) => (
                                            <option 
                                                key={index2 + key} 
                                                value={country._id} 
                                            >{country.name}
                                            </option>
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
                                        name={ stateName } 
                                        onChange={ (event) => _handleChange(event, key) } 
                                        value={ `${formValues[key]?.stateId} ${formValues[key]?.[stateName]}`}
                                    >
                                        <option>Select State</option>

                                        { selectStateOrCountryOption(formValues, stateList, key,index.stateId)}

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
                                        value={index?.city}
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
                                            value={index?.studyField}
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
                                            onChange={ (event) => _handleChange(event, key) }
                                            value = { index.gradMonth}
                                        >
                                            <option>Month</option>
                                            {months?.map((month, index2) => (
                                            <option 
                                                key={index2 + key} 
                                                value={month} 
                                                >{month}
                                            </option>
                                        ))}
                                            
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
                                            onChange={ (event) => _handleChange(event, key) }
                                            value={index.gradYear}
                                        >
                                           
                                            <option>Year</option>
                                            {years?.map((year, index2) => (
                                            <option 
                                                key={index2 + key} 
                                                value={year} 
                                                >{year}
                                            </option>
                                            ))}
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
                                            name="presentAttend"
                                            checked= {formValues[key].presentAttend}
                                            onChange={ (event) => _handleChange(event, key) } 
                                        />
                                    </Form.Group>
                                    </Row>
                                </Form.Group>
                                {formValuesLength > 1 ? 
                                <>
                                {index ? 
                                <div className="icons-list col-md-1 candidate-del" style={{borderBottom: '0 !important', borderRight: '0 !important', padding: '0 !important'}}>
                                    <Link to="#" onClick={(event) => removeFormFields(event, key)}>
                                        <i className="mdi mdi-delete"></i>
                                    </Link>
                                </div>
                                : null}
                                </>
                                  :" "}
                                 
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
                <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit" onClick={props.prevStep} >
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