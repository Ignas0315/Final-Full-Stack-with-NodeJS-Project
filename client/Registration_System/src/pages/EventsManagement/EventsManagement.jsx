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
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween/FlexBetween';
import Header from '../../components/Header/Header';
import { getEventById, getEventParticipantsByEventId } from '../../api/events-api';
import { useTheme } from '@emotion/react';

const EventsManagement = () => {
    const theme = useTheme();

    return <>ENWENE</>;
};

export default EventsManagement;
