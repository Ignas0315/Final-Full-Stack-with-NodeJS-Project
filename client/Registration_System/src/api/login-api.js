import axios from 'axios';
const baseURL = 'http://localhost:8080';

export const login = (body) =>
    axios.post(`${baseURL}/login`, body, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

/*
post('/login
*/
