import { Children } from 'react';
import './Backdrop.css';

const Backdrop = ({ children, hideModalHandler }) => {
    
    const hideModal = () => {
        hideModalHandler(false);
    };

    return (
        <div className="backdrop" onClick={hideModal}>
            {children}
        </div>
    );
};

export default Backdrop;