import './StatsSmallBox.css';
import statsIcon from '../../static/images/stats-icon.png';

const StatsSmallBox = ({title, results}) => {

    return (
        <div className="stats-small-box">
            <div className="small-box-title">
                {title}
            </div>
            <div className="small-box-stats">
                {results}
            </div>
            <div className="box-icon">
                <img className="stats-icon" src={statsIcon} alt="stats-icon"/>
            </div>
        </div>
    );
};

export default StatsSmallBox;