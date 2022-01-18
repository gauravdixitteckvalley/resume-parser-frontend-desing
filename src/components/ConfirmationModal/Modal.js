import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal"

class PopUpModal extends Component {
    _handleModalCloseClick = () => {
        this.props.handleModalClose(false)
    }

    _executeDeleteRequest = () => {
        this.props.updateData(true)
    }

    render() {
        const {showModal, modalTitle, modalBody} = this.props

        return (
            <Modal show={showModal} onHide={this._handleModalCloseClick} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={this._handleModalCloseClick}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={this._executeDeleteRequest}>Yes</button>
                </Modal.Footer>
            </Modal>
        )
    }
    
}

export default PopUpModal