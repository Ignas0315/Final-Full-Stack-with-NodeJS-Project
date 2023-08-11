import {
    Box,
    Button,
    CardMedia,
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
import { useParams } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween/FlexBetween';
import Header from '../../components/Header/Header';
import { getEventById, getEventParticipantsByEventId } from '../../api/events-api';
import { useTheme } from '@emotion/react';
import AddParticipantDialog from './RegisterDialog';
import {
    deleteParticipant,
    registerNewParticipant,
    updateParticipantDetails,
} from '../../api/participants-api';
import EditParticipantDialog from './EditParticipantDialog';

const SingleEvent = () => {
    const theme = useTheme();
    const { id } = useParams();

    const [eventParticipants, setEventParticipants] = useState([]);

    const [event, setEvent] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [selectedRow, setSelectedRow] = useState('');

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

    const handleEditDialogOpen = (id) => {
        setIsEditDialogOpen(true);
        setSelectedRow(id);
    };

    const onEditDialogClose = () => setIsEditDialogOpen(false);

    const handleEditParticipant = async (body) => {
        try {
            await updateParticipantDetails(selectedRow, {
                first_name: body.firstName,
                last_name: body.lastName,
                email: body.email,
                dob: body.dob,
                event_id: id,
                phone: body.phone,
            });

            let nextList = eventParticipants.map((x) => {
                if (x.id === selectedRow) {
                    return {
                        id: selectedRow,
                        first_name: body.firstName,
                        last_name: body.lastName,
                        dob: new Date(body.dob).toISOString().substring(0, 10),
                        email: body.email,
                        age: body.age,
                        phone: body.phone,
                    };
                } else {
                    return x;
                }
            });

            setEventParticipants(nextList);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteParticipant = async (id) => {
        setIsLoading(true);

        try {
            await deleteParticipant(id);

            setEventParticipants((prev) => prev.filter((participant) => participant.id !== id));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddParticipantEvent = async (body) => {
        try {
            const response = await registerNewParticipant({
                first_name: body.firstName,
                last_name: body.lastName,
                email: body.email,
                dob: body.dob,
                event_id: id,
                phone: body.phone,
            });

            setEventParticipants((prev) => [
                ...prev,
                {
                    id: response.data.data.insertId,
                    first_name: body.firstName,
                    last_name: body.lastName,
                    dob: new Date(body.dob).toISOString().substring(0, 10),
                    email: body.email,
                    age: body.age,
                    phone: body.phone,
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
                    <TableCell
                        key={`id${participantData.id}keydat${participantData.id}`}
                        align='center'
                    >
                        {participantData.id}
                    </TableCell>
                    <TableCell
                        key={`id${participantData.id}keydat${participantData.first_name}`}
                        align='center'
                    >
                        {participantData.first_name}
                    </TableCell>
                    <TableCell
                        key={`id${participantData.id}keydat${participantData.last_name}`}
                        align='center'
                    >
                        {participantData.last_name}
                    </TableCell>
                    <TableCell
                        key={`id${participantData.id}keydat${participantData.email}`}
                        align='center'
                    >
                        {participantData.email}
                    </TableCell>
                    <TableCell
                        key={`id${participantData.id}keydat${participantData.dob}`}
                        align='center'
                    >
                        {participantData.dob}
                    </TableCell>
                    <TableCell
                        key={`id${participantData.id}keydat${participantData.age}`}
                        align='center'
                    >
                        {participantData.age}
                    </TableCell>
                    <TableCell
                        key={`id${participantData.id}keydat${participantData.phone}`}
                        align='center'
                    >
                        {participantData.phone}
                    </TableCell>
                    <TableCell align='center'>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.background.very,
                            }}
                            onClick={() => handleEditDialogOpen(participantData.id)}
                        >
                            Edit
                        </Button>
                    </TableCell>
                    <TableCell align='center'>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.background.very,
                            }}
                            onClick={() => handleDeleteParticipant(participantData.id)}
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
                    <Box>
                        <Header
                            title={`${event.name}`}
                            subtitle={`${event.city}, ${event.country}`}
                        />
                        <Typography
                            sx={{ mt: '8px', fontSize: '12px', fontWeight: 'bold' }}
                        >{`${event.date}`}</Typography>
                    </Box>
                    <Box display='flex' justifyContent='space-between'>
                        <Button
                            sx={{ mr: '8px' }}
                            variant='contained'
                            size='medium'
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Register Participant
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
                                    <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                        Phone
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
                {isEditDialogOpen && (
                    <EditParticipantDialog
                        selectedRow={selectedRow}
                        loading={isLoading}
                        open={isEditDialogOpen}
                        onClose={onEditDialogClose}
                        onSaveEdit={handleEditParticipant}
                    />
                )}
            </Box>
        </>
    );
};

export default SingleEvent;
