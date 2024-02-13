import React from 'react';
import Modal from 'react-modal';

const ModalTemplate = ({ isOpen, onRequestClose, title, content, onConfirm, onCancel, confirmText = "Yes", cancelText = "No" }) => {
    console.log(isOpen, onRequestClose, title, content, onConfirm, onCancel, confirmText, cancelText)
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content "
            overlayClassName="modal-overlay"
        >
            <h2>{title}</h2>
            <p className='margin'>{content}</p>
            <div className="btn-container btn-modal">
                <button className="btn btn-primary" onClick={onCancel}>{cancelText}</button>
                <button autoFocus className='btn btn-outline-secondary' onClick={onConfirm}>{confirmText}</button>
            </div>
        </Modal>
    );
};

export default ModalTemplate;
