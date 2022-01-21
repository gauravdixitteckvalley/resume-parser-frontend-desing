import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal"

class EmailModal extends Component {
    state = {
        commentValue : ''
    }

    _handleModalCloseClick = () => {
        this.props.handleModalClose(false)
    }
    
    render() {
        let { commentValue} = this.state;
        const {showModal, modalTitle, modalBody} = this.props

        return (
            <Modal show={showModal} onHide={this._handleModalCloseClick} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body><textarea className="form-control" name='comment' onChange={this._handleChange}   ></textarea></Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={this._handleModalCloseClick}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={this._executeSubmitRequest}>Submit</button>
                </Modal.Footer>
            </Modal>
        )
    }
    
}

export default EmailModal