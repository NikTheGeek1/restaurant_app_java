import './LandingPage.css';
import CustomerBox from '../CustomerBox/CustomerBox';
import AdminBox from '../AdminBox/AdminBox';

const LandingPage = () => {

    return (
        <main className="landing-page-container">
            <div className="customer-admin-login-btns">
                <CustomerBox />
                <AdminBox />
            </div>
        </main>
    );
};

export default LandingPage;