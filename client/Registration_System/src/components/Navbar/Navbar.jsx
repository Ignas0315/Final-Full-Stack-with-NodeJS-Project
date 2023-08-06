import { AppBar, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';
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

export const Navbar = ({ sidebarState, setSidebarState }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

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
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};
