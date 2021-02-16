import { useState } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const Modal = ({ showModal, children, hideModalHandler}) => {
    if (!showModal) {
        return <> </>;
    }
    
    return (
        <>
            <Backdrop hideModalHandler={hideModalHandler}>
                <div className="modal-container" onClick={e => e.stopPropagation()}>{children}</div>
            </Backdrop>
        </>
    );
};

export default Modal;