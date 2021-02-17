import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UserLogin.css';
import FormInput from '../FormIpnut/FormInput';
import Button from '../Button/Button';
import { loginCustomer } from '../../services/customer-services';
import { logUserIn } from '../../store/actions/user-details';

const UserLogin = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('')

    const onUserLoginSubmit = e => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            setFormError('Fill in all fields');
            return;
        }
        setFormError('');
        loginCustomer(email, password,
            successResponse => {
                history.push('/');
                dispatch(logUserIn(successResponse));
            },
            errorResponse => setFormError(errorResponse.message)
        );
    };


    return (
        <form className="user-login-form-container" onSubmit={onUserLoginSubmit}>
            <h3 className="user-registration-box-title">Login</h3>
            {formError !== '' && <h5 className="form-error-message">{formError}</h5>}
            <FormInput onChange={setEmail} placeholder="Email" label="Email" type="email" />
            <FormInput onChange={setPassword} placeholder="Password" label="Password" type="password" />
            <div className="form-btn-container">
                <Button title="Login" type="submit" />
            </div>
        </form>
    );
};

export default UserLogin;