import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateNewAdminDialog = ({
    open,
    onClose,
    onSave,
    loading,
    error,
    dialogType,
    selectedRow,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <Dialog open={open} maxWidth='sm' fullWidth onClose={!loading ? onClose : undefined}>
            {dialogType === 'create' ? (
                <DialogTitle>Add New Admin User</DialogTitle>
            ) : (
                <DialogTitle>Edit Admin with ID: {selectedRow}</DialogTitle>
            )}
            <Typography sx={{ color: '#c50000', ml: '24px' }}>{error}</Typography>
            <DialogContent>
                <Stack pt={2} spacing={2}>
                    <TextField
                        fullWidth
                        label='Email'
                        value={email}
                        disabled={loading}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label='Password'
                        value={password}
                        type='password'
                        disabled={loading}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label='Repeat Password'
                        value={repeatPassword}
                        type='password'
                        disabled={loading}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label='First Name'
                        value={firstName}
                        disabled={loading}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label='Last Name'
                        value={lastName}
                        disabled={loading}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='outlined'
                    disabled={loading}
                    onClick={!loading ? onClose : undefined}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    disabled={loading}
                    onClick={() => {
                        onSave({
                            email,
                            password,
                            repeatPassword,
                            firstName,
                            lastName,
                        });
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNewAdminDialog;
