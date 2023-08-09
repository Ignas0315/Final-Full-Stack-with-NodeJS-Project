import { useTheme } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { deleteAdmin, getAllAdmins } from '../../api/admin-api';
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
} from '@mui/material';
import Header from '../../components/Header/Header';
import FlexBetween from '../../components/FlexBetween/FlexBetween';

const Admin = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [adminsData, setAdminsData] = useState([]);
    const [selectedRow, setSelectedRow] = useState('');
    const [currentAdmin, setCurrentAdmin] = useState('');

    const fetchAllAdmins = async () => {
        try {
            setIsLoading(true);
            const { data } = await getAllAdmins();
            setAdminsData(data);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllAdmins();
    }, []);

    const handleDeleteAdmin = async (id) => {
        setIsLoading(true);

        try {
            await deleteAdmin(id);

            setAdmins((prev) => prev.filter((admin) => admin.id !== id));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const retrieveCurrentAdmin = () => {};

    useEffect(() => {
        retrieveCurrentAdmin();
    }, []);

    console.log(adminsData);

    const adminTable = (entries) => {
        return (
            <>
                <TableRow
                    sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                    }}
                >
                    <TableCell align='center'>{entries.id}</TableCell>
                    <TableCell align='center'>{entries.first_name}</TableCell>
                    <TableCell align='center'>{entries.last_name}</TableCell>
                    <TableCell align='center'>{entries.email}</TableCell>
                    <TableCell align='center'>{entries.created_at}</TableCell>
                    <TableCell align='center'>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.background.very,
                            }}
                            onClick={() => {}}
                        >
                            Edit
                        </Button>
                    </TableCell>
                    <TableCell align='center'>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.background.very,
                            }}
                            onClick={() => handleDeleteAdmin(entries.id)}
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
                    <Header title='Admin' subtitle='View All Admins' />
                    <Button variant='contained' size='medium' onClick={() => setIsDialogOpen(true)}>
                        Create New Admin
                    </Button>
                </FlexBetween>
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
                                            Admin ID
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
                                            Created At
                                        </TableCell>
                                        <TableCell
                                            sx={{ fontWeight: 'bold' }}
                                            align='center'
                                        ></TableCell>
                                        <TableCell
                                            sx={{ fontWeight: 'bold' }}
                                            align='center'
                                        ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {adminsData.map((admin) => adminTable(admin))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Admin;
