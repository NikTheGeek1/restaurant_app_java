import './StatsBigBox.css';

const StatsBigBox = ({startingColumn, children}) => {

    return (
        <div className="stats-big-box" style={{gridColumn: "2/ span "+startingColumn}}>
           {children}
        </div>
    );
};

export default StatsBigBox;