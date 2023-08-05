import axios from 'axios';
const baseURL = 'http://localhost:8080';

export const getAllAdmins = () => axios.get(`${baseURL}/admin`);

export const getAdminById = (id) => axios.get(`${baseURL}/admin/${id}`);

export const deleteAdmin = (id) => axios.delete(`${baseURL}/admin/${id}`);

export const updateAdmin = (id) => axios.patch(`${baseURL}/admin/${id}`);

export const createNewAdmin = (body) => axios.post(`${baseURL}/admin/register`, body);

/*

get('/admin'

get('/admin/:id'

delete('/admin/:id'

.patch('/admin/:id'

post('/admin/register'
*/
