import axios from 'axios';
const baseURL = 'http://localhost:8080';

export const getAllEvents = () =>
    axios.get(`${baseURL}/events`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const getEventParticipantsByEventId = (id) =>
    axios.get(`${baseURL}/events/participants/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const getEventById = (id) =>
    axios.get(`${baseURL}/events/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const deleteEvent = (id) =>
    axios.delete(`${baseURL}/events/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const updateEvent = (id, body) =>
    axios.patch(`${baseURL}/events/${id}`, body, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const createNewEvent = (body) =>
    axios.post(`${baseURL}/events`, body, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

/*
get('/events'

get('/events/participants/:id

.get('/events/:id'

.post('/events'

.delete('/events/:id'

.patch('/events/:id'
*/
