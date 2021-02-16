import './FormInput.css';

const FormInput = ({ onChange, placeholder, label, type }) => {

    return (
        <div className="form-input-container">
            <input
                type={type}
                className="form-input"
                onChange={onChange}
                placeholder={placeholder}
                id={label}
            />
            <label
                className="form-label"
                htmlFor={label}
            >{label}</label>
        </div>
    );
};

export default FormInput;