import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {  useDispatch } from 'react-redux'
import { sendMultiMail } from "../../actions/Resume";


export default function WelcomeModal(props) {
    const [fields,setFields] = useState();
    const dispatch = useDispatch()
    const _handleModalCloseClick = () => {
        props.handleModalClose(false)
    }
    const {showModal, modalTitle} = props
    const _handleSubmit = (event) => {
        event.preventDefault();
        const mails = {
            '1': 'abs@ww.com',
            '2': 'ees@ww.com',
        };
        const postData = {
            'mail_text': fields,
            'mail_ids': mails
        };
        dispatch(sendMultiMail(postData));
        props.handleModalClose(false);
    }
    const _handleChange = (event) => {
        const { value } = event.target;
        setFields(value);
    }
    return (
        <Modal show={showModal} onHide={_handleModalCloseClick} backdrop="static">
            <form className="form-inline user-form" onSubmit={(event) => _handleSubmit(event)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" 
                        name="multi_Mail"
                        placeholder='Enter here'
                        required={true}
                        className="form-control"
                        id="multiMail"
                        onChange={(event)=>_handleChange(event)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={_handleModalCloseClick}>Cancel</button>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
