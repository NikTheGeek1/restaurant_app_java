import './HourlyAvailabilityTable.css';
import DataTable from 'react-data-table-component';
import TableHelperClass from '../../utils/table-utils.js';

const tableHelper = new TableHelperClass();
const HourlyAvailabilityTable = ({ data, date }) => {

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
            />
        </div>
    );
};

export default HourlyAvailabilityTable;