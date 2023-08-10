import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const NotFound = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: theme.palette.primary[600],
            }}
        >
            <Typography variant='h1' style={{ color: 'white' }}>
                404
            </Typography>
            <Typography variant='h6' style={{ color: 'white' }}>
                Page Not Found
            </Typography>
        </Box>
    );
};

export default NotFound;
