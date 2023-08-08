import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween/FlexBetween';
import Header from '../../components/Header/Header';
import {
    createNewEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    getEventParticipantsByEventId,
    updateEvent,
} from '../../api/events-api';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import AddEventDialog from '../Events/AddEventDialog';
import EditEventDialog from './EditEventDialog';

const EventsManagement = () => {
    const theme = useTheme();
    const { state } = useLocation();

    const [eventsList, setEventsList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [selectedRow, setSelectedRow] = useState('');

    const navigate = useNavigate();

    const getEvents = async () => {
        try {
            setIsLoading(true);
            const { data } = await getAllEvents();
            setEventsList(data);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const handleDeleteEvent = async (id) => {
        setIsLoading(true);

        try {
            await deleteEvent(id);

            setEventsList((prev) => prev.filter((event) => event.id !== id));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditEvent = async (body) => {
        try {
            const response = await updateEvent(selectedRow, {
                name: body.name,
                date: body.date,
                description: body.description,
                city: body.city,
                country: body.country,
                image: body.image,
            });

            let nextList = eventsList.map((x) => {
                if (x.id === selectedRow) {
                    return {
                        id: selectedRow,
                        name: body.name,
                        date: new Date(body.date).toISOString().substring(0, 10),
                        description: body.description,
                        city: body.city,
                        country: body.country,
                        image: body.image,
                    };
                } else {
                    return x;
                }
            });

            setEventsList(nextList);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onDialogClose = () => setIsDialogOpen(false);

    const handleEditDialogOpen = (id) => {
        setIsEditDialogOpen(true);
        setSelectedRow(id);
    };

    const handleAddEvent = async (body) => {
        try {
            const response = await createNewEvent({
                name: body.name,
                date: body.date,
                description: body.description,
                city: body.city,
                country: body.country,
                image: body.image,
            });

            console.log(response);

            setEventsList((prev) => [
                ...prev,
                {
                    id: response.data.data[0].insertId,
                    name: body.name,
                    date: new Date(body.date).toISOString().substring(0, 10),
                    description: body.description,
                    city: body.city,
                    country: body.country,
                    image: body.image,
                },
            ]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onEditDialogClose = () => setIsEditDialogOpen(false);

    const eventsTable = (eventData) => {
        return (
            <>
                <TableRow
                    sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                    }}
                    key={`${eventData.id}keyp`}
                >
                    <TableCell
                        key={`${eventData.id}keypd`}
                        onClick={() => navigate(`/event-page/${eventData.id}`)}
                        align='center'
                    >
                        {eventData.id}
                    </TableCell>
                    <TableCell
                        key={`${eventData.id}name`}
                        onClick={() => navigate(`/event-page/${eventData.id}`)}
                        align='center'
                    >
                        {eventData.name}
                    </TableCell>
                    <TableCell
                        key={`${eventData.id}desc`}
                        onClick={() => navigate(`/event-page/${eventData.id}`)}
                        align='center'
                    >
                        {eventData.description}
                    </TableCell>
                    <TableCell
                        key={`${eventData.id}coun`}
                        onClick={() => navigate(`/event-page/${eventData.id}`)}
                        align='center'
                    >
                        {eventData.city}, {eventData.country}
                    </TableCell>
                    <TableCell
                        key={`${eventData.id}keydat`}
                        onClick={() => navigate(`/event-page/${eventData.id}`)}
                        align='center'
                    >
                        {eventData.date}
                    </TableCell>
                    <TableCell key={`${eventData.id}keyed`} align='center'>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.background.very,
                            }}
                            onClick={() => handleEditDialogOpen(eventData.id)}
                        >
                            Edit
                        </Button>
                    </TableCell>
                    <TableCell key={`${eventData.id}keypdel`} align='center'>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.background.very,
                            }}
                            onClick={() => handleDeleteEvent(eventData.id)}
                        >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            </>
        );
    };

    return (
        <>
            <Box m='1.5rem 2.5rem'>
                <FlexBetween>
                    <Header title='Events Management' subtitle='Edit or delete events' />
                    <Box>
                        <Button
                            sx={{ mr: '8px' }}
                            variant='contained'
                            size='medium'
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Add Event
                        </Button>
                    </Box>
                </FlexBetween>
                <Box>
                    <Typography variant='h4' sx={{ mt: '1rem' }}>
                        List of Events
                    </Typography>
                </Box>
                {isLoading ? (
                    <Box>Loading...</Box>
                ) : (
                    <TableContainer
                        component={Paper}
                        sx={{
                            mt: '0.5rem',
                            backgroundColor: theme.palette.background.alt,
                        }}
                    >
                        <Table sx={{ minWidth: 600 }} aria-label='event visitors table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        Event ID
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        Event Name
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        Description
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        Location
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        Date
                                    </TableCell>
                                    <TableCell align='center'></TableCell>
                                    <TableCell align='center'></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody key={`${eventsList.id}+${eventsList.name}`}>
                                {eventsList.map((event) => eventsTable(event))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {isDialogOpen && (
                    <AddEventDialog
                        loading={isLoading}
                        open={isDialogOpen}
                        onClose={onDialogClose}
                        onSave={handleAddEvent}
                    />
                )}
                {isEditDialogOpen && (
                    <EditEventDialog
                        selectedRow={selectedRow}
                        loading={isLoading}
                        open={isEditDialogOpen}
                        onClose={onEditDialogClose}
                        onSaveEdit={handleEditEvent}
                    />
                )}
            </Box>
        </>
    );
};

export default EventsManagement;
