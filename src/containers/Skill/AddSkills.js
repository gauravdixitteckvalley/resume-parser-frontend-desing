import React, { useState, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Form, Row } from "react-bootstrap";
import _ from 'lodash'

import BlockUI from "../../components/BlockUI"
import {history} from '../../utils/helper'
import validateSkillsForm from './SkillsValidation'
import { fetchSkillsEditFormData, submitSkillsFormData, getSkillsCategory } from '../../actions/Skills';
import "./Skill.css";

const SkillsForm = (props) => {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [applyCheck] = useState(currentId ? false : true);

    /**fetched data from redux store */
    const skillsData = useSelector(state => state.skills);
    const dispatch = useDispatch();
console.log('skillsData',skillsData);
    
    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        if(currentId)
            dispatch(fetchSkillsEditFormData(currentId)) // action is called to fetch record
            
        // returned function will be called on component unmount 
        return () => {
            // dispatch(resetUserData())
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        if(currentId)
        dispatch(getSkillsCategory()) // action is called to fetch skills category list

    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    




    /**section to be executed when we open the form in edit mode */
    if(currentId && typeof skillsData != "undefined" && (_.size(skillsData) > 0))
        if (_.size(skillsData.skills) !== _.size(fields))
            setFields({...skillsData.skills})
    /**end of section to be executed when we open the form in edit mode */


    /* validate form */
    const _validateForm = () => {
        let formFields = fields;
        let response = validateSkillsForm(formFields, applyCheck);

        setErrors(response.errors)
        return response.formIsValid;
    }

    /* handle input field changes */
    const _handleChange = (event) => {
        let data = fields;
        data[event.target.name] = event.target.value;
        setFields({...data})
    }

    /* submit form */
    const _handleSubmit = (event) => {
        event.preventDefault();
        
        if (_validateForm()) {
            const { skills_name, skillCategory } = event.target;
            // debugger
            if (skillCategory.value === '') {
                errors["skillCategory"] = "*Please select your skill.";
                setErrors({...errors})
            }else{
                const postData = {
                    skills_name  : skills_name.value,
                    skill_category: skillCategory.value
                }
    
                if(currentId){
                    dispatch(submitSkillsFormData (currentId,postData));  //action is called to submit data
                } else {
                    postData.skills_name = skills_name.value
                    dispatch(submitSkillsFormData('',postData));  // action is called to submit data
                }
            }
            
        }
    }

    /**method called when form is cancelled */
    const _handleCancelForm = () => {
        history.push('/skills')
    }

    const _skill_options = (category) =>{
        return (
            
                <option
                    key={ category._id } 
                    value={ category._id} 
                    selected={(category._id == fields?.skill_category) ? true :false }>
                        { category.name }
                </option>
            
        )
    }
    const selectSkillCategory = (category) => {
        
        if(category.length > 0){
           
            // return skillsData?.skillsCategory.map( (category,index) => (
                // console.log('skillsData',skillsData);
                // _skill_options(category)
                return (
                    <>
                        <option
                            key={ category._id } 
                            value={ category._id} 
                            selected={(category._id == fields?.skill_category) ? true :false }>
                                { category.name }
                        </option>
                    </>
                )
                // ))
        }
        
    }

    const { blocking } = skillsData

    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <div className="page-header">
              <h3 className="page-title">{(currentId) ? 'Edit Skill' : 'Create Skill'}</h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form className="form-inline user-form" onSubmit={(event) => _handleSubmit(event)}>
                                <Row>
                                    <Form.Group className="mb-2 col-md-12">
                                        <label className=" mb-1" htmlFor="inlineFormInputName2">Skill</label>
                                        <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Python"
                                            name="skills_name"  
                                            value={fields.skills_name || ''} 
                                            onChange={(event) => _handleChange(event)}
                                        />
                                        {errors?.skills_name ? (
                                            <Form.Text style={{ color: "red" }}>
                                            { errors?.skills_name }
                                            </Form.Text>
                                        ) : (
                                            ""
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-2 col-md-12">
                                        <Form.Label>Select Skill Category</Form.Label>
                                        <Form.Select 
                                        aria-label="Default select example" 
                                        style={{ border: errors?.skillLevel ? "2px solid red" : "" }} 
                                        name="skillCategory" 
                                        onChange={(event) => _handleChange(event)} 
                                        >
                                            <option value='' >Select your skill level</option>
                                            { skillsData?.skillsCategory?.map( (category,index) => ( 
                                             selectSkillCategory(category)
                                            ))}
                                        </Form.Select>
                                        {errors?.skillCategory ? (
                                            <Form.Text style={{ color: "red" }}>
                                            { errors?.skillCategory }
                                            </Form.Text>
                                        ) : (
                                            ""
                                        )}
                                    </Form.Group> 
                            
                                </Row>
                                <button type="submit" className="btn btn-gradient-primary mb-2">Submit</button>
                                <button className="btn btn-light mb-2"  onClick={_handleCancelForm}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )
}

export default SkillsForm