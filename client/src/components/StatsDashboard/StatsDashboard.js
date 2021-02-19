import './StatsDashboard.css';
import Navigation from '../StatsNavigationMenu/StatsNavigationMenu';
import SmallBox from '../StatsSmallBox/StatsSmallBox';
import StatsLargeBox from '../StatsLargeBox/StatsLargeBox';
import StatsBigBox from '../StatsBigBox/StatsBigBox';
import StatsHugeBox from '../StatsHugeBox/StatsHugeBox';
import LineGraphTrend from '../Figures/LineGraphTrend/LineGraphTrend';
import BarPlotPeakTimes from '../Figures/BarPlotPeakTimes/BarPlotPeakTimes'
import CustomerBookingFreq from '../Figures/CustomerBookingFreq/CustomerBookingFreq';
import statsIcon from '../../static/images/stats-icon.png';
import PreferredMeals from '../Figures/PreferredMeals/PreferredMeals';
import { fetchAllCustomers } from '../../services/customer-services';
import { useEffect, useState } from 'react';


const StatsDashboard = () => {
    const [bookingStatus, setBookingStatus] = useState("DONE");
    const [peakType, setPeakType] = useState("HOURS");
    const [allCustomers, setAllCustomers] = useState([]);
    const [customerEmail, setCustomerEmail] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showSearchResult, setShowSearchResult] = useState(false);

    useEffect(() => {
        fetchAllCustomers(succRes => setAllCustomers(succRes));
    }, []);

    useEffect(() => {
        let timer;
        if (isSearchFocused) {
            return setShowSearchResult(true);
        }
        
        timer = setTimeout(() => setShowSearchResult(false), 100);
        return () => {
            clearTimeout(timer);
        }
    }, [isSearchFocused]);

    const searchFocusHandler = () => {
        setIsSearchFocused(true);
        setCustomerEmail('');
    };

    const customerEmailResultsJSX = allCustomers.map(customer => customer.email).filter(email => email.includes(customerEmail)).map(result => {
        return (
            <div key={result} className="search-result" onClick={() => {
                 setSelectedCustomer(result);
                 setCustomerEmail(result)
            }} >
                {result}
            </div>
        );
    });

    return (
        <div className="stats-dashboard-container">
            <Navigation />
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
                            <h3>Bookings<br />trend</h3>
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
                <StatsBigBox startingColumn={2}>
                    <div className="stats-box-title-container">
                        <div className="box-icon">
                            <img className="stats-icon" src={statsIcon} alt="stats-icon" />
                        </div>
                        <div className="box-title">
                            <h3>Peak <b>{peakType}</b> </h3>
                        </div>
                        <div className="stats-btns">
                            <select className="done-or-pending-btn" onChange={e => setPeakType(e.target.value)}>
                                <option value="HOURS">Hours</option>
                                <option value="DAYS">Days</option>
                                <option value="DATES">Dates</option>
                            </select>
                        </div>
                    </div>
                    <div className="big-box-figure">
                        <BarPlotPeakTimes peakTimesType={peakType} />
                    </div>
                </StatsBigBox>
                <StatsHugeBox>
                    <div className="stats-box-title-container">
                        <div className="box-icon">
                            <img className="stats-icon" src={statsIcon} alt="stats-icon" />
                        </div>
                        <div className="box-title">
                            <h3>Customer frequency</h3>
                        </div>
                    </div>
                    <div className="huge-box-figure">
                        <CustomerBookingFreq rawCustomerData={allCustomers} />
                    </div>
                </StatsHugeBox>
                <StatsLargeBox>
                    <div className="stats-box-title-container">
                        <div className="box-icon">
                            <img className="stats-icon" src={statsIcon} alt="stats-icon" />
                        </div>
                        <div className="box-title">
                            <h5>Customer preferred<br />meals</h5>
                        </div>
                        <div className="stats-btns">
                            <label className="search-box-label">Search by email</label>
                            <input onFocus={searchFocusHandler} onBlur={() => setIsSearchFocused(false)} type="text" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
                            {(!!customerEmailResultsJSX.length && showSearchResult) && <div className="search-bar-results">{customerEmailResultsJSX}</div>}
                        </div>
                    </div>
                    <div className="large-box-figure"> <PreferredMeals rawCustomerData={allCustomers} customer={selectedCustomer}/></div>
                </StatsLargeBox>
            </div>
        </div>
    );
};

export default StatsDashboard;