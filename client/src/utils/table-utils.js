import { getBookingsOfSpecificHour } from './bookings-utils';

class HourlyTable {

    constructor() {
        this.hours = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
        this.data = [];
        this.CELL_WIDTH = "30px";
        this.customStyleUnavailable = {
            backgroundColor: '#44beac',
            borderLeft: "6px solid white",
            borderRight: "6px solid white",
            '&:hover': {
                cursor: 'pointer',
            },
        };
        this.customStyleAvailable = {
            backgroundColor: 'white',
            borderLeft: "6px solid white",
            borderRight: "6px solid white",
            '&::after': {
                content: "'x'",
                color: "#e27f58",
                display: "block",
                fontWeight: "800"
            },
            '&:hover': {
                cursor: 'pointer',
            },
        };
        this.conditionalCellStyle = {
            when: row => {
                return row.available;
            },
            style: {
                backgroundColor: '#44beac',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        };
        this.columns = [
            {
                name: 'TABLE:',
                selector: 'timeSlot',
                width: "80px"
            },
            {
                name: '1', conditionalCellStyles: [{
                    when: row => row.table1,
                    style: this.customStyleAvailable
                },{
                    when: row => !row.table1,
                    style: this.customStyleUnavailable
                }],
                width: this.CELL_WIDTH,
                selector: 'table1'
            },
            {
                name: '2', conditionalCellStyles: [{
                    when: row => row.table2,
                    style: this.customStyleAvailable
                },{
                    when: row => !row.table2,
                    style: this.customStyleUnavailable
                }],
                width: this.CELL_WIDTH,
                selector: 'table2'
            },
            {
                name: '3', conditionalCellStyles: [{
                    when: row => row.table3,
                    style: this.customStyleAvailable
                },{
                    when: row => !row.table3,
                    style: this.customStyleUnavailable
                }],
                width: this.CELL_WIDTH,
                selector: 'table3'
            },
            {
                name: '4', conditionalCellStyles: [{
                    when: row => row.table4,
                    style: this.customStyleAvailable
                },{
                    when: row => !row.table4,
                    style: this.customStyleUnavailable
                }],
                width: this.CELL_WIDTH,
                selector: 'table4'
            }
            ,
            {
                name: '5', conditionalCellStyles: [{
                    when: row => row.table5,
                    style: this.customStyleAvailable
                },{
                    when: row => !row.table5,
                    style: this.customStyleUnavailable
                }],
                width: this.CELL_WIDTH,
                selector: 'table5'
            }
            ,
            {
                name: '6', conditionalCellStyles: [{
                    when: row => row.table6,
                    style: this.customStyleAvailable
                },{
                    when: row => !row.table6,
                    style: this.customStyleUnavailable
                }],
                width: this.CELL_WIDTH,
                selector: 'table6'
            }
            ,
            {
                name: '7', conditionalCellStyles: [{
                    when: row => row.table7,
                    style: this.customStyleAvailable
                },{
                    when: row => !row.table7,
                    style: this.customStyleUnavailable
                }],
                width: this.CELL_WIDTH,
                selector: 'table7'
            }
            ,
            {
                name: '8', conditionalCellStyles: [{
                    when: row => row.table8,
                    style: this.customStyleAvailable
                },{
                    when: row => !row.table8,
                    style: this.customStyleUnavailable
                }],
                width: this.CELL_WIDTH,
                selector: 'table8'
            }
        ];

    }
    static getHours() {
        return this.hours = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
    }

    generateTableDataAndColumns(dateAsString, dailyBookings, duration, currentSelectedTime) {
        const data = [];
        for (let h = 0; h < 22; h++) {
            const dateOfBookings = new Date(dateAsString + " " + this.hours[h]);
            const bookings = getBookingsOfSpecificHour(dateOfBookings, duration, dailyBookings);
            let dataInstance = { id: h, timeSlot: h % 2 === 0 ? this.hours[h] : "", selectedRow: currentSelectedTime === this.hours[h]};
            for (let booking of bookings) {
                dataInstance = { ...dataInstance, ["table" + booking.tableNum]: " "};
            }
            data.push(dataInstance);
        }
        return data;
    }

}

export default HourlyTable;