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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditParticipantDialog = ({ selectedRow, open, onClose, onSaveEdit, loading }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(new Date());
    const [age, setAge] = useState('');
    const [partId, setPartId] = useState('');

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

    const handleSave = () => {
        onSaveEdit({
            firstName,
            lastName,
            dob: dob.toISOString().substring(0, 10),
            email,
            age,
        });
    };

    return (
        <Dialog open={open} maxWidth='sm' fullWidth onClose={!loading ? onClose : undefined}>
            <DialogTitle>Edit participant ID: {selectedRow} details</DialogTitle>
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
                <Button variant='contained' disabled={loading} onClick={() => handleSave()}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditParticipantDialog;
