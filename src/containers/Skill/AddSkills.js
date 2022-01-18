import React, { useState, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import _ from 'lodash'

import BlockUI from "../../components/BlockUI"
import {history} from '../../utils/helper'
import validateSkillsForm from './SkillsValidation'
import { fetchSkillsEditFormData, submitSkillsFormData } from '../../actions/Skills'

const SkillsForm = (props) => {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [applyCheck] = useState(currentId ? false : true);

    /**fetched data from redux store */
    const skillsData = useSelector(state => state.skills);
    const dispatch = useDispatch();

    
    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        if(currentId)
            dispatch(fetchSkillsEditFormData(currentId)) // action is called to fetch record

        // returned function will be called on component unmount 
        return () => {
            // dispatch(resetUserData())
        }
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
            const { skills_name } = event.target;
            const postData = {
                skills_name  : skills_name.value
            }

            if(currentId){
                dispatch(submitSkillsFormData (currentId,postData));  //action is called to submit data
            } else {
                postData.skills_name = skills_name.value
                dispatch(submitSkillsFormData('',postData));  // action is called to submit data
            }
        }
    }

    /**method called when form is cancelled */
    const _handleCancelForm = () => {
        history.push('/skills')
    }

    const { blocking } = skillsData

    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <h3>
                {(currentId) ? 'Edit Skill' : 'Add Skill'}
            </h3>

            <form onSubmit={(event) => _handleSubmit(event)} className="user-form">
                <div className="row clearfix mb-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row clearfix">
                            <div className="col-md-6 mb-3"> <b className="required">Skill</b>
                                <div className="form-group">
                                    <input type="text" name="skills_name" className="form-control" 
                                            value={fields.skills_name || ''} 
                                            onChange={(event) => _handleChange(event)} 
                                             />
                                    <div className="errorMsg">{errors.skills_name}</div>        
                                </div>
                            </div>
                                           
                        </div>
                    </div>
                </div>
                    
                <button type="submit" className="btn btn-success">Submit</button>
                <button className="btn btn-danger ms-2" onClick={_handleCancelForm}>Cancel</button>
            </form>
        </Fragment>
    )
}

export default SkillsForm