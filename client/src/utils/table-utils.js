import COLOURS from '../constants/COLOURS';
import { getBookingsOfSpecificHour } from './bookings-utils';

class HourlyTable {

    constructor() {
        this.hours = ["12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00", "18:00:00", "18:30:00", "19:00:00", "19:30:00", "20:00:00", "20:30:00", "21:00:00", "21:30:00", "22:00:00", "22:30:00", "23:00:00", "23:30:00"];
        this.data = [];
        this.CELL_WIDTH = "30px";
        this.customStyleUnavailable = {
            backgroundColor: '#aaa',
            borderLeft: "6px solid #aaa",
            borderRight: "6px solid #aaa",
            '&::after': {
                content: "'o'",
                color: "green",
                display: "block",
                fontWeight: "800",
                fontSize: "16px"
            },
            '&:hover': {
                cursor: 'pointer',
            },
        };
        this.customStyleAvailable = {
            backgroundColor: "#aaa",
            borderLeft: "6px solid #aaa",
            borderRight: "6px solid #aaa",
            '&::after': {
                content: "'x'",
                color: "red",
                display: "block",
                fontWeight: "800",
                fontSize: "16px"
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
        return ["12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00", "18:00:00", "18:30:00", "19:00:00", "19:30:00", "20:00:00", "20:30:00", "21:00:00", "21:30:00", "22:00:00", "22:30:00", "23:00:00", "23:30:00"];
    }

    generateTableDataAndColumns(dateAsString, dailyBookings, duration, currentSelectedTime) {
        const data = [];
        for (let h = 0; h < 22; h++) {
            const dateOfBookings = new Date(dateAsString + " " + this.hours[h]);
            const bookings = getBookingsOfSpecificHour(dateOfBookings, duration, dailyBookings);
            let dataInstance = { id: h, timeSlot: h % 2 === 0 ? this.hours[h].slice(0, 5) : "", selectedRow: currentSelectedTime === this.hours[h]};
            for (let booking of bookings) {
                dataInstance = { ...dataInstance, ["table" + booking.tableNum]: " "};
            }
            data.push(dataInstance);
        }
        return data;
    }
}

export default HourlyTable;