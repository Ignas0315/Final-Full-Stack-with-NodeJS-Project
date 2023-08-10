import axios from 'axios';
const baseURL = 'http://localhost:8080';

export const getAllAdmins = async () =>
    await axios.get(`${baseURL}/admin`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const getAdminById = async (id) =>
    axios.get(`${baseURL}/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const deleteAdmin = async (id) =>
    await axios.delete(`${baseURL}/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const updateAdmin = async (id, body) =>
    await axios.patch(`${baseURL}/admin/${id}`, body, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const createNewAdmin = async (body) =>
    await axios.post(`${baseURL}/admin/register`, body, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

/*

get('/admin'

get('/admin/:id'

delete('/admin/:id'

.patch('/admin/:id'

post('/admin/register'
*/
