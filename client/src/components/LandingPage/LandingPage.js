import './LandingPage.css';
import Button from '../Button/Button';
import RestaurantCanvas from '../RestaurantCanvas/RestaurantCanvas';

const LandingPage = () => {

    return (
        <main className="landing-page-container">
            <RestaurantCanvas isStatic={true} />
            <div className="customer-admin-login-btns">
                <div className="customer-box">
                    <h1 className="customer-title-landing-page">Are you a customer?</h1>
                    <div className="customer-register-btn">
                        <Button title="Register" />
                    </div>
                    <div className="customer-login-btn">
                        <Button title="Login" />
                    </div>
                </div>
                <div className="admin-box">
                <h1 className="admin-title-landing-page">Are you an admin?</h1>
                    <div className="admin-login-btn">
                        <Button title="Login" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LandingPage;