import axios from 'axios';
const baseURL = 'http://localhost:8080';

export const getAllAdmins = async () => await axios.get(`${baseURL}/admin`);

export const getAdminById = async (id) => axios.get(`${baseURL}/admin/${id}`);

export const deleteAdmin = async (id) => await axios.delete(`${baseURL}/admin/${id}`);

export const updateAdmin = async (id) => await axios.patch(`${baseURL}/admin/${id}`);

export const createNewAdmin = async (body) => await axios.post(`${baseURL}/admin/register`, body);

/*

get('/admin'

get('/admin/:id'

delete('/admin/:id'

.patch('/admin/:id'

post('/admin/register'
*/
