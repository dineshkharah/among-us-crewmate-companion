import React from 'react';
import Modal from 'react-modal';

const ModalTemplate = ({ isOpen, onRequestClose, title, content, onConfirm, onCancel }) => {
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
                <button className="btn btn-outline-primary" onClick={onCancel}>No</button>
                <button className='btn btn-outline-tertiary' onClick={onConfirm}>Yes</button>
            </div>
        </Modal>
    );
};

export default ModalTemplate;
