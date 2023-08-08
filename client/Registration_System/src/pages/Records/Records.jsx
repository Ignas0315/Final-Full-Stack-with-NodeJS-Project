import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material';
import { deleteParticipant, getAllParticipantsEntries } from '../../api/participants-api';

const Records = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [participantData, setParticipantData] = useState([]);
    const [selectedRow, setSelectedRow] = useState('');

    const getAllRegistrations = async () => {
        try {
            setIsLoading(true);
            const { data } = await getAllParticipantsEntries();
            setParticipantData(data);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllRegistrations();
    }, []);

    const handleDeleteParticipant = async (id) => {
        setIsLoading(true);

        try {
            await deleteParticipant(id);

            setParticipantData((prev) => prev.filter((participant) => participant.id !== id));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const recordsTable = (entries) => {
        return (
            <>
                <TableRow
                    sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                    }}
                >
                    <TableCell align='center'>{entries.id}</TableCell>
                    <TableCell align='center'>{entries.event_id}</TableCell>
                    <TableCell align='center'>{entries.first_name}</TableCell>
                    <TableCell align='center'>{entries.last_name}</TableCell>
                    <TableCell align='center'>{entries.dob}</TableCell>
                    <TableCell align='center'>{entries.age}</TableCell>
                    <TableCell align='center'>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.background.very,
                            }}
                            onClick={() => handleDeleteParticipant(entries.id)}
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
                <Header
                    title='Records'
                    subtitle='View All Registrations Currently Made on the Platform'
                />
                <Box>
                    {isLoading ? (
                        <Box>Loading...</Box>
                    ) : (
                        <TableContainer
                            component={Paper}
                            sx={{
                                mt: '1.5rem',
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
                                            Event ID
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                            First Name
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                            Last Name
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                            Date of birth
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                            Age
                                        </TableCell>
                                        <TableCell
                                            sx={{ fontWeight: 'bold' }}
                                            align='center'
                                        ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {participantData.map((participant) =>
                                        recordsTable(participant)
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Records;
