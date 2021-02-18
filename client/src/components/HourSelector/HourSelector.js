import './HourSelector.css';
import ReactSlider from 'react-slider';

const HourSelector = ({ onHourChange, hourValue }) => {

    return (
        <div className="selected-hour-container">
            <h2 className="hour-selector-title">Booking Duration</h2>
            <ReactSlider
                className="horizontal-slider"
                min={30}
                step={30}
                max={120}
                value={hourValue}
                markClassName="example-mark"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                onChange={e => onHourChange(e)}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            />
        </div>
    );
};

export default HourSelector;