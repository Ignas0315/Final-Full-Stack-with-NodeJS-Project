import { useTheme } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { createNewAdmin, deleteAdmin, getAllAdmins, updateAdmin } from '../../api/admin-api';
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
    Tooltip,
} from '@mui/material';
import Header from '../../components/Header/Header';
import FlexBetween from '../../components/FlexBetween/FlexBetween';
import { useNavigate } from 'react-router-dom';
import useAdminDetails from '../../hooks/useAdminDetails';
import CreateNewAdminDialog from './CreateNewAdminDialog';
import validator from 'validator';

const Admin = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [adminsData, setAdminsData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [selectedRow, setSelectedRow] = useState('');
    const [error, setError] = useState('');

    const { adminId } = useAdminDetails();
    const [selectedRowTimestamp, setSelectedRowTimestamp] = useState('');

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

            setAdminsData((prev) => prev.filter((admin) => admin.id !== id));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditAdmin = async (body) => {
        if (body.password === body.repeatPassword) {
            if (validator.isEmail(body.email)) {
                if (body.password.length >= 8) {
                    try {
                        await updateAdmin(selectedRow, {
                            email: body.email,
                            password: body.password,
                            first_name: body.firstName,
                            last_name: body.lastName,
                        });

                        let nextList = adminsData.map((x) => {
                            if (x.id === selectedRow) {
                                return {
                                    id: selectedRow,
                                    email: body.email,
                                    first_name: body.firstName,
                                    last_name: body.lastName,
                                    created_at: selectedRowTimestamp,
                                };
                            } else {
                                return x;
                            }
                        });

                        setAdminsData(nextList);
                        setError('');
                        setIsDialogOpen(false);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        setIsLoading(false);
                    }
                } else {
                    setError(`Password must be at least 8 characters long`);
                }
            } else {
                setError(`${body.email} is not a valid email`);
            }
        } else {
            setError('Passwords did not match');
        }
    };

    const handleAddNewAdmin = async (body) => {
        if (body.password === body.repeatPassword) {
            if (validator.isEmail(body.email)) {
                if (body.password.length >= 8) {
                    try {
                        const response = await createNewAdmin({
                            email: body.email,
                            password: body.password,
                            first_name: body.firstName,
                            last_name: body.lastName,
                        });

                        setAdminsData((prev) => [
                            ...prev,
                            {
                                id: response.data.data[0].insertId,
                                email: body.email,
                                first_name: body.firstName,
                                last_name: body.lastName,
                                created_at: response.data.timestamp[0][0].created_at,
                            },
                        ]);
                        setError('');
                        setIsDialogOpen(false);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        setIsLoading(false);
                    }
                } else {
                    setError(`Password must be at least 8 characters long`);
                }
            } else {
                setError(`${body.email} is not a valid email`);
            }
        } else {
            setError('Passwords did not match');
        }
    };

    const onDialogClose = () => setIsDialogOpen(false);

    const handleAdminEditDialog = (id, timestamp) => {
        setIsDialogOpen(true);
        setSelectedRow(id);
        setSelectedRowTimestamp(timestamp);
        setDialogType('edit');
    };

    const handleOnSave = (body) => {
        if (dialogType === 'create') {
            handleAddNewAdmin(body);
        } else if (dialogType === 'edit') {
            handleEditAdmin(body);
        }
    };

    const adminTable = (entries) => {
        return (
            <>
                <TableRow
                    sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                    }}
                >
                    <TableCell key={`id${entries.id}`} align='center'>
                        {entries.id}
                    </TableCell>
                    <TableCell key={`${entries.id}first_name-${entries.first_name}`} align='center'>
                        {entries.first_name}
                    </TableCell>
                    <TableCell key={`${entries.id}last_name-${entries.last_name}`} align='center'>
                        {entries.last_name}
                    </TableCell>
                    <TableCell key={`${entries.id}email-${entries.email}`} align='center'>
                        {entries.email}
                    </TableCell>
                    <TableCell key={`${entries.id}timestamp-${entries.created_at}`} align='center'>
                        {entries.created_at}
                    </TableCell>
                    <TableCell key={`${entries.id}id${entries.id}-edit`} align='center'>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.background.very,
                            }}
                            onClick={() => handleAdminEditDialog(entries.id, entries.created_at)}
                        >
                            Edit
                        </Button>
                    </TableCell>
                    <TableCell key={`id${entries.id}-delete`} align='center'>
                        {Number(adminId) === entries.id ? (
                            <Tooltip placement='top' title="Can't delete yourself">
                                <span>
                                    <Button
                                        sx={{
                                            backgroundColor: theme.palette.background.disabled,
                                        }}
                                        disabled
                                    >
                                        Delete
                                    </Button>
                                </span>
                            </Tooltip>
                        ) : (
                            <Button
                                sx={{
                                    backgroundColor: theme.palette.background.very,
                                }}
                                onClick={() => handleDeleteAdmin(entries.id)}
                            >
                                Delete
                            </Button>
                        )}
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
                    <Button
                        variant='contained'
                        size='medium'
                        onClick={() => {
                            setIsDialogOpen(true);
                            setDialogType('create');
                        }}
                    >
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
                {isDialogOpen && (
                    <CreateNewAdminDialog
                        loading={isLoading}
                        open={isDialogOpen}
                        onClose={onDialogClose}
                        onSave={(body) => handleOnSave(body)}
                        error={error}
                        dialogType={dialogType}
                        selectedRow={selectedRow}
                    />
                )}
            </Box>
        </>
    );
};

export default Admin;
