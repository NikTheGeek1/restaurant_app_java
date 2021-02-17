import './UserRegister.css';
import FormInput from '../FormIpnut/FormInput';
import { useState } from 'react';
import Button from '../Button/Button';
import { registerCustomer } from '../../services/customer-services';
import { useDispatch } from 'react-redux';
import { logUserIn } from '../../store/actions/user-details';
import { useHistory } from 'react-router-dom';

const UserRegister = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('')

    const onUserRegisterSubmit = e => {
        e.preventDefault();
        if (userName.trim() === '' || email.trim() === '' || password.trim() === '') {
            setFormError('Fill in all fields');
            return;
        }
        setFormError('');
        const customer = { name: userName, password: password, email: email };
        registerCustomer(customer,
            successResponse => {
                history.push('/');
                dispatch(logUserIn(successResponse));
            },
            errorResponse => setFormError(errorResponse.message)
        );
    };


    return (
        <form className="user-register-form-container" onSubmit={onUserRegisterSubmit}>
            <h3 className="user-registration-box-title">User registration</h3>
            {formError !== '' && <h5 className="form-error-message">{formError}</h5>}
            <FormInput onChange={setUserName} placeholder="Name" label="Name" type="text" />
            <FormInput onChange={setEmail} placeholder="Email" label="Email" type="email" />
            <FormInput onChange={setPassword} placeholder="Password" label="Password" type="password" />
            <div className="form-btn-container">
                <Button title="Register" type="submit" />
            </div>
        </form>
    );
};

export default UserRegister;