import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';
import FlexBetween from '../../components/FlexBetween/FlexBetween';
import { useNavigate } from 'react-router-dom';

const HomeCard = (data, type) => {
    const theme = useTheme();
    const navigate = useNavigate();
    console.log(data);

    const card = (data) => {};
    return (
        <>
            {data === null ? (
                <Box>Loading...</Box>
            ) : (
                <Card
                    sx={{
                        backgroundImage: 'none',
                        backgroundColor: theme.palette.background.alt,
                        width: '100%',
                        height: '100%',
                    }}
                    onClick={() => navigate(`${data.link}`)}
                >
                    <CardActionArea>
                        <Box mt='16px' textAlign='center'>
                            {data.icon}
                        </Box>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant='h5' component='div'>
                                Total {data.types}: {data.values.length}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'></Typography>
                            <Box mt='4px'>
                                <FlexBetween>
                                    <Typography
                                        fontWeight='bold'
                                        variant='body2'
                                        color='text.secondary'
                                    ></Typography>
                                    <Typography
                                        fontWeight='bold'
                                        variant='body2'
                                        color='text.secondary'
                                    ></Typography>
                                </FlexBetween>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </>
    );
};

export default HomeCard;
