import './DeleteConfirmation.css';
import Button from '../Button/Button';

const DeleteConfirmation = ({ title, onDeleteConfirmed, hideModalHandler }) => {

    return (
        <div className="delete-confirmation-container">
            <h2 className="delete-booking-confirmation-title">{title}</h2>
            <Button onClickHandler={onDeleteConfirmed} title="DELETE" />
            <Button onClickHandler={() => hideModalHandler(false)} title="CANCEL" />
        </div>
    );
};

export default DeleteConfirmation;