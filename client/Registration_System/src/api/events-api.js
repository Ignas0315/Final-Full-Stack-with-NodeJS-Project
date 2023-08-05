import axios from 'axios';
const baseURL = 'http://localhost:8080';

export const getAllEvents = () => axios.get(`${baseURL}/events`);

export const getEventParticipantsByEventId = (id) =>
    axios.get(`${baseURL}/events/participants/${id}`);

export const getEventById = (id) => axios.get(`${baseURL}/events/${id}`);

export const deleteEvent = (id) => axios.delete(`${baseURL}/events/${id}`);

export const updateEvent = (id, body) => axios.patch(`${baseURL}/events/${id}`, body);

export const createNewEvent = (body) => axios.post(`${baseURL}/events`, body);

/*
get('/events'

get('/events/participants/:id

.get('/events/:id'

.post('/events'

.delete('/events/:id'

.patch('/events/:id'
*/
