import { Children } from 'react';
import './Backdrop.css';

const Backdrop = ({ children, hideModalHandler, hidePortableModalHandler }) => {
    
    const hideModal = () => {
        hidePortableModalHandler && hidePortableModalHandler({});
        hideModalHandler(false);
    };

    return (
        <div className="backdrop" onClick={hideModal}>
            {children}
        </div>
    );
};

export default Backdrop;