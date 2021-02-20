import './CustomerInterface.css';
import RestaurantCanvas from '../RestaurantCanvas/RestaurantCanvas';
import { useEffect, useState } from 'react';
import { getBookingsFromDate } from '../../services/booking-services';
import { getBookingsOfSpecificHour, dateToString, getAvailableTablesOfSpecificHour } from '../../utils/bookings-utils';
import DateSelector from '../DateSelector/DateSelector';
import HourlyTable from '../../utils/table-utils';
import { useLocation } from 'react-router-dom';
import PortableModal from '../PortableModal/PortableModal';
import DurationSelector from '../HourSelector/HourSelector';
import Logout from '../Logout/Logout';
import TimeSelector from '../TimeSelector/TimeSelector';
import MenuForCustomers from '../MenuForCustomers/MenuForCustomers';

const CustomerInterface = () => {
    const [dailyBookings, setDailyBookings] = useState([]);
    const [specificHourBookings, setSpecificHourBookings] = useState([]);
    const [availableTablesAtSpecificTime, setAvailableTablesAtSpecificTime] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(0);
    const [portableModalPosition, setPortableModalPosition] = useState({});
    const [selectedDuration, setSelectedDuration] = useState(90);
    const [clickedTableObj, setClickedTableObj] = useState({});
    const location = useLocation();


    useEffect(() => {
        let clickedTable;
        if (Object.keys(portableModalPosition).length) {
            clickedTable = specificHourBookings.filter(booking => booking.id === portableModalPosition.bookingId)[0];
            setClickedTableObj(clickedTable);
        }

    }, [portableModalPosition]);

    useEffect(() => {
        if (location.state && location.state.date && location.state.time && location.state.bookingDuration) {
            setSelectedDate(new Date(location.state.date));
            setSelectedTime(HourlyTable.getHours().indexOf(location.state.time));
            setSelectedDuration(location.state.bookingDuration);
        }
    }, [location.state]);

    useEffect(() => {
        const dateAsString = dateToString(selectedDate);
        getBookingsFromDate(dateAsString, "PENDING",
            successResponse => setDailyBookings(successResponse),
            errorResponse => console.log(errorResponse));
    }, [selectedDate]);


    useEffect(() => {
        const dateAsString = dateToString(selectedDate);
        const dateOfBookings = new Date(dateAsString + " " + HourlyTable.getHours()[selectedTime]);
        const reservedBookings = getBookingsOfSpecificHour(dateOfBookings, selectedDuration, dailyBookings);
        setSpecificHourBookings(reservedBookings);
        const availableTablesOnSpecificTime = getAvailableTablesOfSpecificHour(reservedBookings);
        setAvailableTablesAtSpecificTime(availableTablesOnSpecificTime);
    }, [selectedDuration, selectedTime, dailyBookings]);

    return (
        <>
            <Logout user="CUSTOMER" />
            <RestaurantCanvas
                bookingData={specificHourBookings}
                availableTables={availableTablesAtSpecificTime}
                setPortableModalPosition={setPortableModalPosition}
            />
            <div className="admin-interface-container">
                {!!Object.keys(portableModalPosition).length && <PortableModal
                    pendingOrDone={"PENDING"}
                    hidePortableModalHandler={setPortableModalPosition}
                    clickedBooking={clickedTableObj}
                    position={{ top: portableModalPosition.mousePos.y, left: portableModalPosition.mousePos.x }}
                    tableNum={portableModalPosition.tableNum}
                    bookingData={specificHourBookings}
                    bookingDuration={selectedDuration}
                    dayBookings={dailyBookings}
                    bookingDate={dateToString(selectedDate)}
                    bookingTime={HourlyTable.getHours()[selectedTime]}
                />}
                <DurationSelector onHourChange={setSelectedDuration} hourValue={selectedDuration} />
                <TimeSelector onTimeChange={setSelectedTime} timeValue={selectedTime} />
                <DateSelector onDateChange={setSelectedDate} dateValue={selectedDate} />
                <MenuForCustomers />
            </div>
        </>
    );
};

export default CustomerInterface;