import { Box, Card, useTheme } from '@mui/material';
import React from 'react';
import Header from '../../components/Header/Header';

const Events = () => {
    const theme = useTheme();
    return (
        <>
            <Box>
                <Header title='Events' subtitle='View and Manage Events' />
            </Box>
            <Card
                sx={{
                    backgroundImage: 'none',
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: '0.55rem',
                }}
            ></Card>
        </>
    );
};

export default Events;
