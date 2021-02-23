import './TimeSelector.css';
import ReactSlider from 'react-slider';
import HourlyTable from '../../utils/table-utils';

const TimeSelector = ({ onTimeChange, timeValue }) => {

    return (
        <div className="time-selector-container">
            <ReactSlider
                className="horizontal-slider"
                min={0}
                max={20}
                value={timeValue}
                markClassName="example-mark"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                onChange={e => onTimeChange(e)}
                renderThumb={(props, state) => <div {...props}>{HourlyTable.getHours()[state.valueNow].slice(0, 5)}</div>}
            />
        </div>
    );
};

export default TimeSelector;