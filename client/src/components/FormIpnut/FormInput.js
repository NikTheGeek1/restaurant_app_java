import './FormInput.css';

const FormInput = ({ onChange, placeholder, label, type }) => {

    return (
        <div className="form-input-container">
            <input
                type={type}
                className="form-input"
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                id={label}
                required
            />
            <label
                className="form-label"
                htmlFor={label}
            >{label}</label>
        </div>
    );
};

export default FormInput;