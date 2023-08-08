import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween/FlexBetween';
import Header from '../../components/Header/Header';
import { getAllEvents } from '../../api/events-api';
import { getAllParticipantsEntries, getUniqueParticipants } from '../../api/participants-api';

const Home = () => {
    const theme = useTheme();
    const [eventsList, setEventsList] = useState([]);
    const [uniqueParticipants, setUniqueParticipants] = useState([]);
    const [totalRegistrations, setTotalRegistrations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        // setFilterEv(response.data)
    };

    const getTotalRegistrations = async () => {
        try {
            setIsLoading(true);
            const { data } = await getAllParticipantsEntries();
            setTotalRegistrations(data);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
        // setFilterEv(response.data)
    };

    const loadUniqueParticipants = async () => {
        try {
            setIsLoading(true);
            const { data } = await getUniqueParticipants();
            setUniqueParticipants(data);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    useEffect(() => {
        loadUniqueParticipants();
    }, []);

    useEffect(() => {
        getTotalRegistrations();
    }, []);

    console.log(eventsList);
    console.log(uniqueParticipants);
    console.log(totalRegistrations);

    return (
        <>
            <>
                <Box m='1.5rem 2.5rem'>
                    <Header title='Home' subtitle='Welcome to event management platform' />
                    <Box>
                        {isLoading ? (
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
                                ></Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </>
        </>
    );
};

export default Home;
