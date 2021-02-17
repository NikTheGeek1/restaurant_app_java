import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';
import ReactDOM from 'react-dom';

const Modal = ({ showModal, children, hideModalHandler }) => {
    if (!showModal) {
        return <> </>;
    }

    const ModalJSX = (
        <>
            <Backdrop hideModalHandler={hideModalHandler}>
                <div className="modal-container" onClick={e => e.stopPropagation()}>{children}</div>
            </Backdrop>
        </>
    );

    return ReactDOM.createPortal(ModalJSX, document.getElementById('modal'));
};


export default Modal;