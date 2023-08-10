import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import PageTemplate from '../../layouts/page-template/PageTemplate';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoutes = () => {
    const { expiry } = useContext(AuthContext);

    const isValidUser = () => {
        if (expiry < Date.now()) {
            return true;
        } else {
            return false;
        }
    };

    const check = isValidUser();

    return check ? <PageTemplate /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
