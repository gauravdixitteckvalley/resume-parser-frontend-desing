import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import BlockUI from "../../components/BlockUI";
import NoticeFormValidation from "./NoticeFormValidation";
import { noticeSend,fetchUserData } from '../../actions/Notice';

const Notice = () => {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const notices = useSelector(state => state.notice);

    const { blocking, userList } = notices;

    const dispatch = useDispatch()

    useEffect(() => {
        _getUserData();

    }, []);

    const _validateForm = () => {
        let formFields = fields;
        let response = NoticeFormValidation(formFields);

        setErrors(response.errors)
        return response.formIsValid;
    }

    /* handle input field changes */
    const _handleChange = (target) => {
        let data = fields;
        data[target.name] = target.value;
        setFields({...data})
    }

    const _getUserData = () =>{
        dispatch(fetchUserData())
    }

    const _handleSubmit = (event) => {
        event.preventDefault();

        if (_validateForm()) {
            const { message, to } = fields;
            const postData = {
                to : to,
                noticeText: message
            }
            
            dispatch(noticeSend(postData));  // action is called to submit data 
        }
    }

    return (
        <Fragment>
            <BlockUI blocking={blocking}/>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="page-title font-style-bold mb-4">Notices & Events</h4>
                            <hr className="mb-4" />
                            <form className="form-inline edit-form" onSubmit={(event) => _handleSubmit(event)}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="mb-1 required" for="inlineFormInputName2">Select User</label>
                                        <select name="to" value={fields.to || ''} onChange={(event) => _handleChange(event.target)} className="form-control mb-2 mr-sm-2 col-md-6">
                                            <option>Select User</option>
                                            <option value="all">All</option>
                                            {userList?.map((data, index) => (
                                                <option key={index} value={data._id}>{data.first_name +' '+ data.last_name }</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <label className="mb-1 required" for="inlineFormInputName2">Description</label>
                                        <textarea style={{minHeight: '150px'}} 
                                        name="message" 
                                        onChange={(event) => _handleChange(event.target)} 
                                        className="form-control mb-2 mr-sm-2 col-md-12" 
                                        id="inlineFormInputName2" 
                                        placeholder="Type Your Message" />
                                        <div className="errorMsg">{errors.message}</div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-gradient-primary mt-2 mb-2">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Notice