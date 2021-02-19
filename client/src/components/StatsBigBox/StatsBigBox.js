import './StatsBigBox.css';
import statsIcon from '../../static/images/stats-icon.png';

const StatsBigBox = ({title, startingColumn, children}) => {

    return (
        <div className="stats-big-box" style={{gridColumn: "2/ span "+startingColumn}}>
            <div className="stats-box-title-container">
                <div className="box-icon">
                    <img className="stats-icon" src={statsIcon} alt="stats-icon" />
                </div>
                <div className="box-title">
                    {title}
                </div>
            </div>
            <div className="big-box-figure">{children}</div>
        </div>
    );
};

export default StatsBigBox;