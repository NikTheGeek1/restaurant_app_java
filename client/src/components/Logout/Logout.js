import './Logout.css';
import Button from '../Button/Button';
import { logAdminOut } from '../../store/actions/admin-details';
import { logUserOut } from '../../store/actions/user-details';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Logout = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const logoutHandler = () => {
        if (user === "ADMIN") {
            return dispatch(logAdminOut());
        }
        dispatch(logUserOut());
        history.push('/');
    };

    return (
        <div className="logout-btn">
            <Button onClickHandler={logoutHandler} title="Logout" />
        </div>
    );
};

export default Logout;