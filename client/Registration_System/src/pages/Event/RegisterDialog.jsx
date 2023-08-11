import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import React from 'react';

const AddParticipantDialog = ({ open, onClose, onSave, loading }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(new Date());
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');

    const calculateAge = (dob) => {
        const currentDate = Date.now();
        const dobDate = new Date(dob).getTime();
        const month_diff = currentDate - dobDate;
        const age_d = new Date(month_diff);
        const year = age_d.getUTCFullYear();
        return Math.abs(year - 1970);
    };

    const setNewVals = (value) => {
        setDob(value);
        setAge(calculateAge(value));
    };

    return (
        <Dialog open={open} maxWidth='sm' fullWidth onClose={!loading ? onClose : undefined}>
            <DialogTitle>Add New Participant</DialogTitle>
            <DialogContent>
                <Stack pt={2} spacing={2}>
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
                    <DatePicker
                        label='Date of Birth'
                        value={dob}
                        disabled={loading}
                        onChange={(value) => setNewVals(value)}
                    />
                    <TextField
                        fullWidth
                        label='Email'
                        value={email}
                        type='email'
                        disabled={loading}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label='Phone'
                        value={phone}
                        disabled={loading}
                        onChange={(e) => setPhone(e.target.value)}
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
                    onClick={() =>
                        onSave({
                            firstName,
                            lastName,
                            dob: dob.toISOString().substring(0, 10),
                            email,
                            age,
                            phone,
                        })
                    }
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddParticipantDialog;
