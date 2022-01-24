// import React, { Component } from 'react'
// import Modal from "react-bootstrap/Modal"

// class EmailModal extends Component {
//     state = {
//         commentValue : ''
//     }

//     _handleModalCloseClick = () => {
//         this.props.handleModalClose(false)
//     }
    
//     render() {
//         let { commentValue} = this.state;
//         const {showModal, modalTitle, modalBody} = this.props

//         return (
//             <Modal show={showModal} onHide={this._handleModalCloseClick} backdrop="static">
//                 <Modal.Header closeButton>
//                     <Modal.Title>{modalTitle}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body></Modal.Body>
//                 <Modal.Footer>
//                     <button type="button" className="btn btn-danger" onClick={this._handleModalCloseClick}>Cancel</button>
//                     <button type="button" className="btn btn-primary" onClick={this._executeSubmitRequest}>Submit</button>
//                 </Modal.Footer>
//             </Modal>
//         )
//     }
    
// }

// export default EmailModal

import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from 'react-redux'
import { fetchResumeData, resetResumeData,updateStatusField,sendMultiMail } from "../../actions/Resume";
import { displayRecordNotFound, API_URL, displayErrorMessage } from '../../utils/helper';
import axios from 'axios';

export default function EmailModal(props) {
    const [fields,setFields] = useState();
    const dispatch = useDispatch()
    const _handleModalCloseClick = () => {
        props.handleModalClose(false)
    }
    const {showModal, modalTitle} = props
    const _handleSubmit = (event) => {
        event.preventDefault();
        // const { multi_Mail } = event.target;
        //console.log("123: ",fields);
        const mails = {
            '1': 'abs@ww.com',
            '2': 'ees@ww.com',
        };
        const postData = {
            'mail_text': fields,
            'mail_ids': props.sendMailData
        };
        dispatch(sendMultiMail(postData));
        props.handleModalClose(false);
    }
    const _handleChange = (event) => {
        const { name, value } = event.target;
        setFields(value);
    }
    return (
        <Modal show={showModal} onHide={_handleModalCloseClick} backdrop="static">
            <form className="form-inline user-form" onSubmit={(event) => _handleSubmit(event)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea 
                        className="form-control" 
                        name="multi_Mail"
                        id="multiMail" 
                        placeholder='Enter here'
                        onChange={(event)=>_handleChange(event)}
                        required={true}  
                    ></textarea>
                    
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={_handleModalCloseClick}>Cancel</button>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
