import './AdminBox.css';
import Button from '../Button/Button';

const AdminBox = () => {

    return (
        <div className="admin-box">
            <h1 className="admin-title-landing-page">Are you an admin?</h1>
            <div className="admin-login-btn">
                <Button title="Login" />
            </div>
        </div>
    );
};

export default AdminBox;