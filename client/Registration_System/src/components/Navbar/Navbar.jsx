import { AppBar, Button, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import FlexBetween from './../FlexBetween/FlexBetween';
import {
    DarkModeOutlined,
    LightModeOutlined,
    ListOutlined,
    MenuOpen,
    Search,
    ViewHeadline,
    ViewSidebarOutlined,
} from '@mui/icons-material';
import { setMode } from '../../state';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { loggedAdmin } from '../../assets/loggedAdmin';

export const Navbar = ({ sidebarState, setSidebarState }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    // const [anchorEl, setAnchorEl] = useState();

    // const isOpen = Boolean(anchorEl);
    // const handleClick = (event) => setAnchorEl(event.currentTarget);
    // const handleClose = () => setAnchorEl(null);

    // const [admin, setAdmin] = useState();

    // const getCurrentAdmin = async () => {
    //     const current = await loggedAdmin();
    //     setAdmin(current);
    // };

    // useEffect(() => {
    //     getCurrentAdmin();
    // }, []);

    return (
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
                    {/* 
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
                            A
                        </Button>
                    </FlexBetween> */}
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};
