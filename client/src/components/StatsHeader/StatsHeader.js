import './StatsHeader.css';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logAdminOut } from '../../store/actions/admin-details';

const StatsHeader = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = () => {
        dispatch(logAdminOut());
        history.push('/');
    };

    return (
        <div className="stas-header-container">
            <SearchBar />
            <div className="header-logout-btn">
                <Button onClickHandler={logoutHandler} title="Lougout" />
            </div>
        </div>
    );
};

export default StatsHeader;