import './MenuItem.css';

const MenuItem = ({ qty_value, qty_onChange, itemName }) => {

    return (
        <div className="menu-item-container">
                <h5 className="menu-item-label">{itemName}</h5>
                <input onChange={e => qty_onChange(e)} type="number" style={{color: "black"}} value={qty_value ? qty_value > 0 ? qty_value : 0 : 0} className="menu-item-qty"/>
        </div>
    );
};

export default MenuItem;