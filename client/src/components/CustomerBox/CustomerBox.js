import './CustomerBox.css';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import UserRegister from '../UserRegister/UserRegister';

const CustomerBox = () => {

    const [showUserLoginModal, setShowUserLoginModal] = useState(false);
    const [showUserRegisterModal, setShowUserRegisterModal] = useState(false);

    return (
        <div className="customer-box">
            <h1 className="customer-title-landing-page">Are you a customer?</h1>
            <div className="customer-register-btn">
                <Button title="Register" onClickHandler={setShowUserLoginModal.bind(true)}/>
                <Modal showModal={showUserLoginModal} hideModalHandler={setShowUserLoginModal}>
                    <UserRegister />
                </Modal>
            </div>
            <div className="customer-login-btn">
                <Button title="Login" onClickHandler={setShowUserRegisterModal.bind(true)}/>
                <Modal showModal={showUserRegisterModal} hideModalHandler={setShowUserRegisterModal}>
                    <div>hello</div>
                </Modal>
            </div>
        </div>
    );
};

export default CustomerBox;