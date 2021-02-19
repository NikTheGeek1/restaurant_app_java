import './StatsLargeBox.css';
import statsIcon from '../../static/images/stats-icon.png';

const StatsLargeBox = ({ title }) => {

    return (
        <div className="stats-large-box">
            <div className="stats-box-title-container">
                <div className="box-icon">
                    <img className="stats-icon" src={statsIcon} alt="stats-icon" />
                </div>
                <div className="box-title">
                    {title}
                </div>
            </div>
            <div className="large-box-figure"></div>
        </div>
    );
};

export default StatsLargeBox;