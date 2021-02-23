import './HourlyAvailabilityTable.css';
import DataTable, { createTheme }  from 'react-data-table-component';
import TableHelperClass from '../../utils/table-utils.js';
import COLOURS from '../../constants/COLOURS';

const tableHelper = new TableHelperClass();
const HourlyAvailabilityTable = ({ data, date }) => {
    createTheme('solarized', {
        text: {
          primary: 'white',
          secondary: 'white'
        },
        background: {
          default: "#aaa",
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
            default: COLOURS.primary,
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
      });
    const customStyles = {
        rows: {
            style: {
                minHeight: '20px', // override the row height
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
                paddingLeft: '8px', 
                paddingRight: '8px',
            },
        },
    };

    return (
        <div className="hourly-table-container">
            <DataTable
                title={"Available tables for " + date}
                columns={tableHelper.columns}
                data={data}
                customStyles={customStyles}
                conditionalRowStyles={[{
                    when: row => row.selectedRow,
                    style: {"border": "solid 1px red !important", marginLeft: "-1px"}
                }]}
                theme="solarized"
            />
        </div>
    );
};

export default HourlyAvailabilityTable;