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
import { getEventById, getEventParticipantsByEventId } from '../../api/events-api';
import { useTheme } from '@emotion/react';
import AddParticipantDialog from './RegisterDialog';
import { registerNewParticipant } from '../../api/participants-api';
import EditEventDialog from './EditEventDialog';

const SingleEvent = () => {
    const theme = useTheme();
    const { id } = useParams();
    const { state } = useLocation();

    const [eventParticipants, setEventParticipants] = useState([]);

    const [event, setEvent] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isEventEditDialogOpen, setIsEditEventDialogOpen] = useState(false);

    const fetchEventData = async (id) => {
        setIsLoading(true);
        try {
            const { data } = await getEventById(id);

            setEvent(data[0]);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEventParticipants = async (id) => {
        setIsLoading(true);
        try {
            const { data } = await getEventParticipantsByEventId(id);

            setEventParticipants(data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEventParticipants(id);
    }, [id]);

    useEffect(() => {
        fetchEventData(id);
    }, [id]);

    const onDialogClose = () => setIsDialogOpen(false);

    const onEditDialogClose = () => setIsEditEventDialogOpen(false);

    const handleAddParticipantEvent = async (body) => {
        try {
            const response = await registerNewParticipant({
                first_name: body.firstName,
                last_name: body.firstName,
                email: body.email,
                dob: body.dob,
                event_id: id,
            });

            console.log(response);

            setEventParticipants((prev) => [
                ...prev,
                {
                    id: response.data.data.insertId,
                    first_name: body.firstName,
                    last_name: body.lastName,
                    dob: new Date(body.dob).toISOString().substring(0, 10),
                    email: body.email,
                    age: body.age,
                },
            ]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const participantTable = (participantData) => {
        return (
            <>
                <TableRow
                    sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                    }}
                >
                    <TableCell align='center'>{participantData.id}</TableCell>
                    <TableCell align='center'>{participantData.first_name}</TableCell>
                    <TableCell align='center'>{participantData.last_name}</TableCell>
                    <TableCell align='center'>{participantData.email}</TableCell>
                    <TableCell align='center'>{participantData.dob}</TableCell>
                    <TableCell align='center'>{participantData.age}</TableCell>
                    <TableCell align='center'>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.background.very,
                            }}
                        >
                            Edit
                        </Button>
                    </TableCell>
                    <TableCell align='center'>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.background.very,
                            }}
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
                    <Header title={`${event.name}`} subtitle={`${event.city}, ${event.country}`} />
                    <Box display='flex' justifyContent='space-between'>
                        <Button
                            sx={{ mr: '8px' }}
                            variant='contained'
                            size='medium'
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Register Participant
                        </Button>
                        <Button
                            sx={{ mr: '0.5rem' }}
                            variant='contained'
                            size='medium'
                            onClick={() => setIsEditEventDialogOpen(true)}
                        >
                            Edit Event
                        </Button>
                    </Box>
                </FlexBetween>
                <Box>
                    <Typography variant='h4' sx={{ mt: '1rem' }}>
                        List of Participants
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
                                        Participant ID
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        First Name
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        Last Name
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        Email
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        Date of birth
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        Age
                                    </TableCell>
                                    <TableCell align='center'></TableCell>
                                    <TableCell align='center'></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {eventParticipants.map((participant) =>
                                    participantTable(participant)
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {isDialogOpen && (
                    <AddParticipantDialog
                        loading={isLoading}
                        open={isDialogOpen}
                        onClose={onDialogClose}
                        onSave={handleAddParticipantEvent}
                    />
                )}
                {isEventEditDialogOpen && (
                    <EditEventDialog
                        loading={isLoading}
                        open={isEventEditDialogOpen}
                        onClose={onEditDialogClose}
                        onSave={handleAddParticipantEvent}
                    />
                )}
            </Box>
        </>
    );
};

export default SingleEvent;
