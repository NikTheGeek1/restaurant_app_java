import './StatsHugeBox.css';
import statsIcon from '../../static/images/stats-icon.png';

const StatsHugeBox = ({ title, children }) => {

    return (
        <div className="stats-huge-box">
            <div className="stats-box-title-container">
                <div className="box-icon">
                    <img className="stats-icon" src={statsIcon} alt="stats-icon" />
                </div>
                <div className="box-title">
                    {title}
                </div>
            </div>
            <div className="huge-box-figure">{children}</div>
        </div>
    );
};

export default StatsHugeBox;