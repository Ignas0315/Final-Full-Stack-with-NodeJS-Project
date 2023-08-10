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
import { deleteParticipant, getUniqueParticipants } from '../../api/participants-api';

const Participants = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [participantData, setParticipantData] = useState([]);

    const fetchUniqueParticipants = async () => {
        try {
            setIsLoading(true);
            const { data } = await getUniqueParticipants();
            setParticipantData(data);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUniqueParticipants();
    }, []);

    const recordsTable = (entries) => {
        return (
            <>
                <TableRow
                    hover={true}
                    sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                    }}
                >
                    <TableCell align='center'>{entries.first_name}</TableCell>
                    <TableCell align='center'>{entries.last_name}</TableCell>
                    <TableCell align='center'>{entries.email}</TableCell>
                    <TableCell align='center'>{entries.dob}</TableCell>
                    <TableCell align='center'>{entries.age}</TableCell>
                </TableRow>
            </>
        );
    };
    return (
        <>
            <Box m='1.5rem 2.5rem'>
                <Header
                    title='Participants'
                    subtitle='View All Unique Participants Registered on the Platform'
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

export default Participants;
