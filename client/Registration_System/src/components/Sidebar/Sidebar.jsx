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
    PowerSettingsNew,
    SettingsOutlined,
    Storage,
} from '@mui/icons-material';
import { loggedAdmin } from '../../assets/loggedAdmin';
import { getAdminById } from '../../api/admin-api';
import { getCookieValue } from '../../assets/getCookieValue';

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
        text: 'Records',
        icon: <Storage />,
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
    const [admin, setAdmin] = useState(null);

    const getCurrentAdmin = async () => {
        const response = await getAdminById(getCookieValue('id'));
        setAdmin(response);
    };

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    useEffect(() => {
        getCurrentAdmin();
    }, []);

    const handleLogout = () => {
        navigate(`/login`);
    };

    return admin === null ? (
        <div>Loading...</div>
    ) : (
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

                    <Box position='absolute' bottom='2rem'>
                        <Divider />
                        <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 0 3rem'>
                            <Box
                                position='relative'
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'
                                component='div'
                                height='2.5rem'
                                width='2.5rem'
                                borderRadius='50%'
                                backgroundColor='#14b8a6'
                                margin='0 auto'
                                textAlign='center'
                            >
                                {`${admin.data[0].first_name.slice(
                                    0,
                                    1
                                )}${admin.data[0].last_name.slice(0, 1)}`}
                            </Box>
                            <Box>
                                <Typography fontSize='12px'>{admin.data[0].first_name}</Typography>
                                <Typography fontSize='12px'>{admin.data[0].last_name}</Typography>
                            </Box>
                            <IconButton onClick={handleLogout}>
                                <PowerSettingsNew />
                            </IconButton>
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};
