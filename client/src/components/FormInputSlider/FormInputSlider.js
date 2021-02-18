import './FormInputSlider.css';
import ReactSlider from 'react-slider';

const FormInputSlider = ({ sliderValue, onChange, maxValue, title, disabled }) => {
    console.log(disabled, 'FormInputSlider.js', 'line: ', '5');
    return (
        <div className="form-input-container form-input-slider-container">
            <ReactSlider
                className="horizontal-slider"
                min={30}
                disabled={disabled}
                step={30}
                max={maxValue}
                value={sliderValue}
                markClassName="example-mark"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                onChange={e => onChange(e)}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            />
            <h5 className="form-input-slider-title">{title}</h5>
        </div>
    );
};

export default FormInputSlider;