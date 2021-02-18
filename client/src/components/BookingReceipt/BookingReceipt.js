import './BookingReceipt.css';
import MenuItem from '../MenuItem/MenuItem';
import { MENU_ITEMS, convertQtyObjectToList } from '../../utils/menu-items-utils';
import { useState } from 'react';
import Button from '../Button/Button';

const BookingReceipt = ({ clickedBooking, onSubmitReceipt }) => {
    const [itemCount, setItemCount] = useState({});

    const changeItemQuantityHandler = (e, item) => {
        const updatedCount = { ...itemCount };
        updatedCount[item] = e.target.value;
        setItemCount(updatedCount);
    };

    const submitReceiptHandler = () => {
        const menuItemsList = convertQtyObjectToList(itemCount);
        const receipt = { booking: clickedBooking, order: menuItemsList };
        onSubmitReceipt(receipt);
    };

    const menuItemsJSX = MENU_ITEMS.map(item => {
        return (
            <MenuItem
                key={item.realName}
                itemName={item.prettyName}
                qty_onChange={(e) => changeItemQuantityHandler(e, item.realName)}
                qty_value={itemCount[item.realName]}
            />
        );
    });

    return (
        <div className="bookint-receipt-container">
            <h1 className="menu-item-title">Menu Items</h1>
            <hr />
            {menuItemsJSX}
            <hr />
            <Button onClickHandler={submitReceiptHandler} title="Submit" />
        </div>
    );
};

export default BookingReceipt;