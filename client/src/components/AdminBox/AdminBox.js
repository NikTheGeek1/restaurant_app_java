import './AdminBox.css';
import Button from '../Button/Button';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import AdminLogin from '../AdminLogin/AdminLogin';

const AdminBox = () => {
    const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

    return (
        <div className="admin-box">
            <h1 className="admin-title-landing-page">Are you an admin?</h1>
            <div className="admin-login-btn">
                <Button title="Login" onClickHandler={setShowAdminLoginModal.bind(true)} />
                <Modal showModal={showAdminLoginModal} hideModalHandler={setShowAdminLoginModal}>
                    <AdminLogin />
                </Modal>
            </div>
        </div>
    );
};

export default AdminBox;