import './StatsDashboard.css';
import Navigation from '../StatsNavigationMenu/StatsNavigationMenu';
import Header from '../StatsHeader/StatsHeader';
import SmallBox from '../StatsSmallBox/StatsSmallBox';
import StatsLargeBox from '../StatsLargeBox/StatsLargeBox';
import StatsBigBox from '../StatsBigBox/StatsBigBox';
import StatsHugeBox from '../StatsHugeBox/StatsHugeBox';

const StatsDashboard = () => {

    return (
        <div className="stats-dashboard-container">
            <Navigation />
            <Header />
            <div className="stats-main-content-container">
                <SmallBox  />
                <SmallBox />
                <SmallBox />
                <StatsLargeBox />
                <StatsBigBox startingColumn={2}/>
                <StatsHugeBox /> 
            </div>
        </div>
    );
};

export default StatsDashboard;