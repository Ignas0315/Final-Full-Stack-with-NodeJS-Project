import axios from 'axios';
const baseURL = 'http://localhost:8080';

export const getUniqueParticipants = () =>
    axios.get(`${baseURL}/participants/unique`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const getAllParticipantsEntries = () =>
    axios.get(`${baseURL}/participants`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const getParticipantsById = (id) =>
    axios.get(`${baseURL}/participants/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const deleteParticipant = (id) =>
    axios.delete(`${baseURL}/participants/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const getParticipantEvents = (id) =>
    axios.get(`${baseURL}/participant-events/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const updateParticipantDetails = (id, body) =>
    axios.patch(`${baseURL}/participants/${id}`, body, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

export const registerNewParticipant = (body) =>
    axios.post(`${baseURL}/participants`, body, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
