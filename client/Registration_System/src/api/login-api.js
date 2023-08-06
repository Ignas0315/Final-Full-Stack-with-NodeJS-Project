import axios from 'axios';
const baseURL = 'http://localhost:8080';

export const login = async (body) => {
    try {
        return await axios.post(`${baseURL}/login`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        return 'error';
    }
};

/*
post('/login
*/
