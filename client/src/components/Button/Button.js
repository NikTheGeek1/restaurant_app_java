import './Button.css';

const Button = ({ title, onClickHandler }) => {

    return (
        <div className="simple-btn">{title}</div>
    );
};

export default Button;