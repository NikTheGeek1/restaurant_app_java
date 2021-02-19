import './StatsLargeBox.css';
import statsIcon from '../../static/images/stats-icon.png';

const StatsLargeBox = ({ title, children }) => {

    return (
        <div className="stats-large-box">
            {children}
        </div>
    );
};

export default StatsLargeBox;