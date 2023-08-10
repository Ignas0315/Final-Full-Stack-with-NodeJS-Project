import { useEffect, useState } from 'react';

const useAdminDetails = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [adminId, setAdminId] = useState('');

    const adminStatus = () => {
        const token = localStorage.getItem('token');
        const retrievedId = document.cookie.split('=')[1];

        if (token) {
            setLoginStatus(true);
        }

        if (retrievedId) {
            setAdminId(retrievedId);
        }
    };

    useEffect(() => {
        adminStatus();
    }, []);

    return { loginStatus, adminId };
};

export default useAdminDetails;
