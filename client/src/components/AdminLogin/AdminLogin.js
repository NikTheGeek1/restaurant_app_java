import './AdminLogin.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormInput from '../FormIpnut/FormInput';
import Button from '../Button/Button';
import { loginAdmin } from '../../services/admin-services';
import { logAdminIn } from '../../store/actions/admin-details';

const AdminLogin = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('')

    const onAdminLoginSubmit = e => {
        e.preventDefault();
        if (name.trim() === '' || password.trim() === '') {
            setFormError('Fill in all fields');
            return;
        }
        setFormError('');
        loginAdmin(name, password,
            successResponse => {
                dispatch(logAdminIn({name: name}));
                history.push('/');
            },
            errorResponse => setFormError(errorResponse.message)
        );
    };


    return (
        <form className="admin-login-form-container" onSubmit={onAdminLoginSubmit}>
            <h3 className="admin-registration-box-title">Admin Login</h3>
            {formError !== '' && <h5 className="form-error-message">{formError}</h5>}
            <FormInput onChange={setName} placeholder="Name" label="Name" type="text" />
            <FormInput onChange={setPassword} placeholder="Password" label="Password" type="password" />
            <div className="form-btn-container">
                <Button title="Login" type="submit" />
            </div>
        </form>
    );
};

export default AdminLogin;