import './UserRegister.css';
import FormInput from '../FormIpnut/FormInput';
import { useState } from 'react';
import Button from '../Button/Button';

const UserRegister = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onUserRegisterSubmit = () => {
        if (userName.trim() === '' || email.trim() === '' || password.trim() === '') {
            return;
        } 
        //TODO: register user to back-end
    };


    return (
        <div className="user-register-form-container">
            <FormInput onChange={setUserName} placeholder="Name" label="Name" type="text" />
            <FormInput onChange={setEmail} placeholder="Email" label="Email" type="email" />
            <FormInput onChange={setPassword} placeholder="Password" label="Password" type="password" />
            <Button onClickHandler={onUserRegisterSubmit} title="Register"/>
        </div>
    );
};

export default UserRegister;