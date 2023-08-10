import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { createNewEvent, getAllEvents } from '../../api/events-api';
import FlexBetween from '../../components/FlexBetween/FlexBetween';
import AddEventDialog from './AddEventDialog';

const Events = () => {
    const theme = useTheme();
    const [eventsList, setEventsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const mobileConstraint = useMediaQuery('(min-width: 600px)');

    const getEvents = async () => {
        try {
            setIsLoading(true);
            const { data } = await getAllEvents();
            setEventsList(data);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const onDialogClose = () => setIsDialogOpen(false);

    const handleAddEvent = async (body) => {
        try {
            const response = await createNewEvent({
                name: body.name,
                date: body.date,
                description: body.description,
                city: body.city,
                country: body.country,
                image: body.image,
            });

            setEventsList((prev) => [
                ...prev,
                {
                    id: response.data.data[0].insertId,
                    name: body.name,
                    date: new Date(body.date).toISOString().substring(0, 10),
                    description: body.description,
                    city: body.city,
                    country: body.country,
                    image: body.image,
                },
            ]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const card = (eventData) => {
        return (
            <>
                <Card
                    key={`${eventData.id}keyp`}
                    sx={{
                        backgroundImage: 'none',
                        backgroundColor: theme.palette.background.alt,
                        width: '100%',
                        height: '100%',
                    }}
                    onClick={() => navigate(`/event-page/${eventData.id}`)}
                >
                    <CardActionArea>
                        <CardMedia
                            component='img'
                            alt='event_picture'
                            height='140'
                            image={eventData.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                                {eventData.name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                {eventData.description}
                            </Typography>
                            <Box mt='4px'>
                                <FlexBetween>
                                    <Typography
                                        fontWeight='bold'
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {eventData.city}, {eventData.country}
                                    </Typography>
                                    <Typography
                                        fontWeight='bold'
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {eventData.date}
                                    </Typography>
                                </FlexBetween>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </>
        );
    };

    const navigate = useNavigate();
    return (
        <>
            <Box m='1.5rem 2.5rem'>
                <FlexBetween>
                    <Header title='Events' subtitle='View and Manage Events' />
                    <Box display={mobileConstraint ? 'flex' : 'block'} textAlign='right'>
                        <Button
                            sx={mobileConstraint ? { mr: '8px' } : { mr: '0px', mb: '8px' }}
                            variant='contained'
                            size='medium'
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Add Event
                        </Button>
                        <Button
                            variant='contained'
                            size='medium'
                            onClick={() => navigate(`/events/configuration`)}
                        >
                            Configuration
                        </Button>
                    </Box>
                </FlexBetween>
                {eventsList === null ? (
                    <Box>Loading...</Box>
                ) : (
                    <Box mt='1.5rem'>
                        <Box
                            mt='20px'
                            display='grid'
                            gridTemplateColumns='repeat(auto-fill, minmax(350px, 1fr))'
                            rowGap='20px'
                            columnGap='1.33%'
                            width='100%'
                        >
                            {eventsList.map((event) => (
                                <Card key={`${event.id}+${event.name}`}>{card(event)}</Card>
                            ))}
                        </Box>
                        {isDialogOpen && (
                            <AddEventDialog
                                loading={isLoading}
                                open={isDialogOpen}
                                onClose={onDialogClose}
                                onSave={handleAddEvent}
                            />
                        )}
                    </Box>
                )}
            </Box>
        </>
    );
};

export default Events;
