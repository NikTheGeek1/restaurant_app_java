import './AdminInterface.css';
import RestaurantCanvas from '../RestaurantCanvas/RestaurantCanvas';
import { useEffect, useState } from 'react';
import HourlyAvailabilityTable from '../HourlyAvailabilityTable/HourlyAvailabilityTable';
import { getBookingsFromDate } from '../../services/booking-services';
import { getBookingsOfSpecificHour, dateToString, getAvailableTablesOfSpecificHour } from '../../utils/bookings-utils';
import DateSelector from '../DateSelector/DateSelector';
import HourlyTable from '../../utils/table-utils';
import { useLocation } from 'react-router-dom';
import PortableModal from '../PortableModal/PortableModal';
import HourSelector from '../HourSelector/HourSelector';
import Logout from '../Logout/Logout';
import Button from '../Button/Button';



const hourlyTable = new HourlyTable();
const BOOKING_STATUS_SWAPPER = {
    PENDING: "DONE",
    DONE: "PENDING"
};  
const AdminInterface = () => {
    const [dailyBookings, setDailyBookings] = useState([]);
    const [specificHourBookings, setSpecificHourBookings] = useState([]);
    const [availableTablesAtSpecificTime, setAvailableTablesAtSpecificTime] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(0);
    const [portableModalPosition, setPortableModalPosition] = useState({});
    const [selectedDuration, setSelectedDuration] = useState(90);
    const [reservedBookingsTableData, setReservedBookingsTableData] = useState([]);
    const [clickedTableObj, setClickedTableObj] = useState({});
    const [pendingOrDoneBookings, setpendingOrDoneBookings] = useState('PENDING');
    const location = useLocation();

    useEffect(() => {
        if (Object.keys(portableModalPosition).length) {
            const clickedTable = specificHourBookings.filter(booking => booking.tableNum === portableModalPosition.tableNum)[0];
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
        getBookingsFromDate(dateAsString, pendingOrDoneBookings,
            successResponse => setDailyBookings(successResponse),
            errorResponse => console.log(errorResponse));
    }, [selectedDate, pendingOrDoneBookings]);


    useEffect(() => {
        const dateAsString = dateToString(selectedDate);
        const dateOfBookings = new Date(dateAsString + " " + HourlyTable.getHours()[selectedTime]);
        const reservedBookings = getBookingsOfSpecificHour(dateOfBookings, selectedDuration, dailyBookings);
        setSpecificHourBookings(reservedBookings);
        const availableTablesOnSpecificTime = getAvailableTablesOfSpecificHour(reservedBookings);
        setAvailableTablesAtSpecificTime(availableTablesOnSpecificTime);
        const tableData = hourlyTable.generateTableDataAndColumns(dateAsString, dailyBookings, selectedDuration, HourlyTable.getHours()[selectedTime]);
        setReservedBookingsTableData(tableData);
    }, [selectedDuration, selectedTime, dailyBookings]);

    const toggleBookingStatus = () => {
        setpendingOrDoneBookings(BOOKING_STATUS_SWAPPER[pendingOrDoneBookings]);
    };

    return (
        <>
            <Logout user={"ADMIN"} />
            <div className="status-of-bookings-container">
                <Button onClickHandler={toggleBookingStatus} title="Bookings status" />
            </div>
            <RestaurantCanvas
                bookingData={specificHourBookings}
                availableTables={availableTablesAtSpecificTime}
                setPortableModalPosition={setPortableModalPosition}
            />
            <div className="admin-interface-container">
                {!!Object.keys(portableModalPosition).length && <PortableModal
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
                <HourSelector onHourChange={setSelectedDuration} hourValue={selectedDuration} />
                <DateSelector
                    onDateChange={setSelectedDate} dateValue={selectedDate}
                    onTimeChange={setSelectedTime} timeValue={selectedTime}
                />
                <HourlyAvailabilityTable data={reservedBookingsTableData} date={dateToString(selectedDate)} />
            </div>
        </>
    );
};

export default AdminInterface;