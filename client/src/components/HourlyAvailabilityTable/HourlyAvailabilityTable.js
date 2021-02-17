import './HourlyAvailabilityTable.css';
import DataTable, { createTheme } from 'react-data-table-component';
import { useMemo } from 'react';
// import { dataTable, columns} from '../../utils/table-utils.js';

const CELL_WIDTH = "30px";
const HourlyAvailabilityTable = () => {

    const columns = [
        {
            name: 'TABLES:',
            selector: 'timeSlot',
            width: "80px"
        },
        {
            name: '1',
            width: CELL_WIDTH,
            selector: 'table1',
            conditionalCellStyles: [
                {
                  when: row => row.table1,
                  style: {
                    backgroundColor: 'rgba(63, 0, 128, 0.9)',
                    color: 'white',
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  },
                }]
        },
        {
            name: '2',
            width: CELL_WIDTH,
            selector: 'table2'
        }
    ];


    const customStyles = {
        rows: {
          style: {
            minHeight: '15px', // override the row height
          }
        },
        headCells: {
          style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
          },
        },
        cells: {
          style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
          },
        },
      };

      
    return (
        <DataTable
            title="Movie List"
            columns={columns}
            data={data}
            customStyles={customStyles}
            />
    );
};

export default HourlyAvailabilityTable;