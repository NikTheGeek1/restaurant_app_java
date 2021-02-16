import './Button.css';

const Button = ({ title, onClickHandler }) => {

    return (
        <div className="simple-btn" onClick={onClickHandler}>{title}</div>
    );
};

export default Button;