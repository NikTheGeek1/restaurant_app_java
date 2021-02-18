import './MenuItem.css';

const MenuItem = ({ qty_value, qty_onChange, itemName }) => {

    return (
        <div className="menu-item-container">
                <h5 className="menu-item-label">{itemName}</h5>
                <input onChange={qty_onChange} type="number" value={qty_value ? qty_value : 0} className="menu-item-qty"/>
        </div>
    );
};

export default MenuItem;