import {
    AppBar,
    Box,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FlexBetween from './../FlexBetween/FlexBetween';
import {
    DarkModeOutlined,
    LightModeOutlined,
    ListOutlined,
    LoopOutlined,
    MenuOpen,
    Search,
    ViewHeadline,
    ViewSidebarOutlined,
} from '@mui/icons-material';
import { setMode } from '../../state/store';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { loggedAdmin } from '../../assets/loggedAdmin';
import { getAdminById } from '../../api/admin-api';
import { getCookieValue } from '../../assets/getCookieValue';

export const Navbar = ({ sidebarState, setSidebarState }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState();
    const [admin, setAdmin] = useState(null);

    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const getCurrentAdmin = async () => {
        const response = await getAdminById(getCookieValue('id'));
        setAdmin(response);
    };

    useEffect(() => {
        getCurrentAdmin();
    }, []);

    return admin === null ? (
        <LoopOutlined />
    ) : (
        <AppBar
            sx={{
                position: 'static',
                background: 'none',
                boxShadow: 'none',
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                }}
            >
                <FlexBetween>
                    <IconButton onClick={() => setSidebarState(!sidebarState)}>
                        <ViewHeadline />
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        padding='0.125rem 1.5rem '
                        borderRadius='0.5rem'
                        gap='3rem'
                    >
                        <InputBase placeholder='Search...' />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                <FlexBetween gap='1.5rem'>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <LightModeOutlined
                                sx={{
                                    fontSize: '24px',
                                }}
                            />
                        ) : (
                            <DarkModeOutlined
                                sx={{
                                    fontSize: '24px',
                                }}
                            />
                        )}
                    </IconButton>
                    <IconButton>
                        <SupervisorAccountIcon
                            sx={{
                                fontSize: '24px',
                            }}
                        />
                    </IconButton>

                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textTransform: 'none',
                                gap: '1rem',
                            }}
                        >
                            <Box
                                position='relative'
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'
                                component='div'
                                height='2.125rem'
                                width='2.125rem'
                                borderRadius='50%'
                                backgroundColor='#14b8a6'
                                margin='0 auto'
                                textAlign='center'
                                fontWeight='bold'
                                color='#FFFFFF'
                            >
                                {`${admin.data[0].first_name.slice(
                                    0,
                                    1
                                )}${admin.data[0].last_name.slice(0, 1)}`}
                            </Box>
                            <Box>
                                {theme.palette.mode === 'dark' ? (
                                    <Box>
                                        <Typography fontSize='12px'>
                                            {admin.data[0].first_name}
                                        </Typography>
                                        <Typography fontSize='12px'>
                                            {admin.data[0].last_name}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Typography color='#626262' fontSize='12px'>
                                            {admin.data[0].first_name}
                                        </Typography>
                                        <Typography color='#626262' fontSize='12px'>
                                            {admin.data[0].last_name}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        >
                            <MenuItem>Log Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};
