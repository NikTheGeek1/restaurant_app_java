import './DateSelector.css';
import './Calendar.css';
// import ReactSlider from 'react-slider';
// import HourlyTable from '../../utils/table-utils';

import Calendar from 'react-calendar';

const DateSelector = ({ onDateChange, dateValue, onTimeChange, timeValue }) => {

    return (
        <div className="date-selector-container">
            {/* <ReactSlider
                className="horizontal-slider"
                min={0}
                max={20}
                value={timeValue}
                markClassName="example-mark"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                onChange={e => onTimeChange(e)}
                renderThumb={(props, state) => <div {...props}>{HourlyTable.getHours()[state.valueNow]}</div>}
            /> */}
            <Calendar
                onChange={e => onDateChange(e)}
                value={dateValue}
            />
        </div>
    );
};

export default DateSelector;