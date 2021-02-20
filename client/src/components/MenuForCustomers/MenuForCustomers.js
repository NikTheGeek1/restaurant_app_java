import './MenuForCustomers.css';
import { MENU_ITEMS } from '../../utils/menu-items-utils';


const MenuForCustomers = () => {
    const menuJSX = MENU_ITEMS.map(item => {
        return (
            <div className="menu-item-customer" key={item.realName}>{item.prettyName}</div>
        );
    });

    return (
        <div className="menu-for-customers-outer-container">
            <h2 className="menu-title">Menu</h2>
            <div className="menu-for-customers-inner-container">
                {menuJSX}
            </div>
        </div>
    );
};

export default MenuForCustomers;