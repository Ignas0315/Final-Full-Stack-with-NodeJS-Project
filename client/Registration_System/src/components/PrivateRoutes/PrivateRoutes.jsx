import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import PageTemplate from '../../layouts/page-template/PageTemplate';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoutes = () => {
    const { expiry } = useContext(AuthContext);

    //can check JWT instead of just simple date as in example

    const isValidUser = () => {
        console.log(expiry);
        if (expiry) {
            return true;
        } else {
            return false;
        }
    };

    const check = isValidUser();

    return check ? <PageTemplate /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
