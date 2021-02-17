class HourlyTable {
    constructor() {
        this.hours = ["12:00", "12:30","13:00", "13:30","14:00", "14:30","15:00", "15:30","16:00", "16:30","17:00", "17:30","18:00", "18:30","19:00", "19:30","20:00", "20:30","21:00", "21:30","22:00", "22:30","23:00", "23:30"];
        this.data = [];
    }
    static getHours() {
        return this.hours = ["12:00", "12:30","13:00", "13:30","14:00", "14:30","15:00", "15:30","16:00", "16:30","17:00", "17:30","18:00", "18:30","19:00", "19:30","20:00", "20:30","21:00", "21:30","22:00", "22:30","23:00", "23:30"];
    }
    dataTableInstance(id, timeSlot, t1, t2, t3, t4, t5, t6, t7, t8) {
        return {id: id,
            timeSlot: timeSlot,
            table1: t1,
            table2: t2,
            table3: t3,
            table4: t4,
            table5: t5,
            table6: t6,
            table7: t7,
            table8: t8
        };
    }

    generateTableData(tablesAvailability) {
        for (let h = 0; h < 22; h++) {
            this.data.push(this.dataTableInstance(
                 h, this.timeSlot[h], [...tablesAvailability]
            ));
        }
    }
}

export default HourlyTable;