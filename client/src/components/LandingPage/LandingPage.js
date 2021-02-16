import './LandingPage.css';
import RestaurantCanvas from '../RestaurantCanvas/RestaurantCanvas';
import { useState } from 'react';
import CustomerBox from '../CustomerBox/CustomerBox';
import AdminBox from '../AdminBox/AdminBox';

const LandingPage = () => {
    const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

    return (
        <main className="landing-page-container">
            <RestaurantCanvas isStatic={true} />
            <div className="customer-admin-login-btns">
                <CustomerBox />
                <AdminBox />
            </div>
        </main>
    );
};

export default LandingPage;