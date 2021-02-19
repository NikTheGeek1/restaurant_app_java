import './StatsDashboard.css';
import Navigation from '../StatsNavigationMenu/StatsNavigationMenu';
import Header from '../StatsHeader/StatsHeader';
import SmallBox from '../StatsSmallBox/StatsSmallBox';
import StatsLargeBox from '../StatsLargeBox/StatsLargeBox';
import StatsBigBox from '../StatsBigBox/StatsBigBox';
import StatsHugeBox from '../StatsHugeBox/StatsHugeBox';
import LineGraphTrend from '../Figures/LineGraphTrend/LineGraphTrend';
import statsIcon from '../../static/images/stats-icon.png';
import { useState } from 'react';


const StatsDashboard = () => {
    const [bookingStatus, setBookingStatus] = useState("DONE");

    return (
        <div className="stats-dashboard-container">
            <Navigation />
            <Header />
            <div className="stats-main-content-container">
                <SmallBox />
                <SmallBox />
                <SmallBox />
                <StatsLargeBox>
                    <div className="stats-box-title-container">
                        <div className="box-icon">
                            <img className="stats-icon" src={statsIcon} alt="stats-icon" />
                        </div>
                        <div className="box-title">
                            <h3>Bookings<br/>trend</h3>
                        </div>
                        <div className="stats-btns">
                            <select className="done-or-pending-btn" onChange={e => setBookingStatus(e.target.value)}>
                                <option value="DONE">Done</option>
                                <option value="PENDING">Pending</option>
                                <option value="BOTH">Both</option>
                            </select>
                        </div>
                    </div>
                    <div className="large-box-figure"> <LineGraphTrend status={bookingStatus} /></div>
                </StatsLargeBox>
                <StatsBigBox startingColumn={2} />
                <StatsHugeBox />
            </div>
        </div>
    );
};

export default StatsDashboard;