import './AdminInterface.css';
import RestaurantCanvas from '../RestaurantCanvas/RestaurantCanvas';
import { useEffect, useState } from 'react';
import HourlyAvailabilityTable from '../HourlyAvailabilityTable/HourlyAvailabilityTable';
import { getBookingsFromDate } from '../../services/booking-services';
import { getBookingsOfSpecificHour, dateToString } from '../../utils/bookings-utils';
import DateSelector from '../DateSelector/DateSelector';
import HourlyTable from '../../utils/table-utils';

const hourlyTable = new HourlyTable();
const AdminInterface = () => {
    const [dailyBookings, setDailyBookings] = useState([]);
    const [specificHourBookings, setSpecificHourBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(0);
    const [reservedBookingsTableData, setReservedBookingsTableData] = useState([]);

    useEffect(() => {
        const dateAsString = dateToString(selectedDate);
        getBookingsFromDate(dateAsString, "pending",
            successResponse => setDailyBookings(successResponse),
            errorResponse => console.log(errorResponse));
    }, [selectedDate]);


    useEffect(() => {
        const dateAsString = dateToString(selectedDate);
        const dateOfBookings = new Date(dateAsString + " " + HourlyTable.getHours()[selectedTime]);
        const reservedBookings = getBookingsOfSpecificHour(dateOfBookings, dailyBookings);
        setSpecificHourBookings(reservedBookings);

        const tableData = hourlyTable.generateTableDataAndColumns(dateAsString, dailyBookings, HourlyTable.getHours()[selectedTime]);
        setReservedBookingsTableData(tableData);
    }, [selectedTime, dailyBookings]);



    return (
        <>
            <RestaurantCanvas bookingData={specificHourBookings} />
            <div className="admin-interface-container">
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