import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from '../FlexBetween/FlexBetween';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import {
    AdminPanelSettings,
    ChevronRightOutlined,
    EventOutlined,
    Home,
    MenuOpenOutlined,
    PersonOutlineOutlined,
} from '@mui/icons-material';

const sidebarItems = [
    {
        text: 'Home',
        icon: <Home />,
    },
    {
        text: 'Events Management',
        icon: null,
    },
    {
        text: 'Events',
        icon: <EventOutlined />,
    },
    {
        text: 'Participants',
        icon: <PersonOutlineOutlined />,
    },
    {
        text: 'Administration',
        icon: null,
    },
    {
        text: 'Admin',
        icon: <AdminPanelSettings />,
    },
];

export const Sidebar = ({ drawerWidth, sidebarState, setSidebarState, mobileConstraint }) => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const [active, setActive] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);
    return (
        <Box component='nav'>
            {sidebarState && (
                <Drawer
                    open={sidebarState}
                    onClose={() => setSidebarState(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: 'border-box',
                            borderWidth: mobileConstraint ? 0 : '0.125rem',
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width='100%'>
                        <Box m='1.5rem 2rem 2rem 3rem'>
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display='flex' alignItems='center' gap='0.5rem'>
                                    <Typography variant='h4' fontWeight='bold'>
                                        Event Platform
                                    </Typography>
                                </Box>
                                {!mobileConstraint && (
                                    <IconButton onClick={() => setSidebarState(!sidebarState)}>
                                        <MenuOpenOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {sidebarItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                                            {text}
                                        </Typography>
                                    );
                                }

                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette.secondary[300]
                                                        : 'transparent',
                                                color:
                                                    active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: '2rem',
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: 'auto' }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};
