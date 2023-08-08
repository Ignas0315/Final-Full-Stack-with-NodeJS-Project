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

const EditEventDialog = ({ selectedRow, open, onClose, onSaveEdit, loading }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');

    const handleSave = () => {
        onSaveEdit({
            name,
            date: date.toISOString().substring(0, 10),
            description,
            city,
            country,
            image,
        });
    };

    return (
        <Dialog open={open} maxWidth='sm' fullWidth onClose={!loading ? onClose : undefined}>
            <DialogTitle>Edit Event ID: {selectedRow} details</DialogTitle>
            <DialogContent>
                <Stack pt={2} spacing={2}>
                    <TextField
                        fullWidth
                        label='Name'
                        value={name}
                        disabled={loading}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <DatePicker
                        label='Date'
                        value={date}
                        disabled={loading}
                        onChange={(value) => setDate(value)}
                    />
                    <TextField
                        fullWidth
                        label='Description'
                        value={description}
                        disabled={loading}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label='City'
                        value={city}
                        disabled={loading}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label='Country'
                        value={country}
                        disabled={loading}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label='Image'
                        value={image}
                        disabled={loading}
                        onChange={(e) => setImage(e.target.value)}
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

export default EditEventDialog;
