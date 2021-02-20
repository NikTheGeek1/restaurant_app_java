import './CustomerPastReceipt.css';
import Button from '../Button/Button';
import { countItems } from '../../utils/receipts-utils';

const CustomerPastReceipt = ({ clickedBooking }) => {

    const menuItemsJSX = [];
    const orderCounter = countItems(clickedBooking.receipt.order);
    for (const item in orderCounter) {
        const qty = orderCounter[item];
        menuItemsJSX.push(
            <div className="menu-item-container" key={item}>
                <h5 className="menu-item-label">{item}</h5>
                <h5 className="menu-item-qty">{qty}</h5>
            </div>
        );
    }   


    return (
        <div className="bookint-receipt-container">
            <h1 className="menu-item-title">Menu Items</h1>
            <hr />
            {menuItemsJSX}
            <hr />
            <h4 className="total-cost-past-booking">Total: £{clickedBooking.receipt.totalCost}</h4>
            
        </div>
    );
};

export default CustomerPastReceipt;