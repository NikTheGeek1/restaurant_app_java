import './TimeSelector.css';
import ReactSlider from 'react-slider';
import HourlyTable from '../../utils/table-utils';

const TimeSelector = ({ onTimeChange, timeValue }) => {

    return (
        <div className="time-selector-container">
            <ReactSlider
                orientation="vertical"
                className="vertical-slider"
                min={0}
                max={20}
                value={timeValue}
                markClassName="example-mark-vertical"
                thumbClassName="example-thumb-vertical"
                trackClassName="example-track-vertical"
                onChange={e => onTimeChange(e)}
                renderThumb={(props, state) => <div {...props}>{HourlyTable.getHours()[state.valueNow].slice(0, 5)}</div>}
            />
        </div>
    );
};

export default TimeSelector;