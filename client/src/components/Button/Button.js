import './Button.css';

const Button = ({ title, onClickHandler, type }) => {

    return (
        type === "submit" ? <input className="simple-btn-submit" type="submit" name={title}/>:
        <div className="simple-btn" onClick={onClickHandler}>{title}</div>
    );
};

export default Button;