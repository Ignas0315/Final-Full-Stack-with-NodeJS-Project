import axios from 'axios';
const baseURL = 'http://localhost:8080';

export const getUniqueParticipants = () => axios.get(`${baseURL}/participants/unique`);

export const getAllParticipantsEntries = () => axios.get(`${baseURL}/participants`);

export const getParticipantsById = (id) => axios.get(`${baseURL}/participants/${id}`);

export const deleteParticipant = (id) => axios.delete(`${baseURL}/participants/${id}`);

export const getParticipantEvents = (id) => axios.get(`${baseURL}/participant-events/${id}`);

export const updateParticipantDetails = (id, body) => axios.patch(`${baseURL}/events/${id}`, body);

export const registerNewParticipant = (body) => axios.post(`${baseURL}/participants`, body);

/*
.get('/participants/unique
.get('/participants'
.get('/participants/:id
.post('/participants'
.delete('/participants/:id'
.get('/participant-events/:id'
.patch('/participants/:id'
*/
