import React from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar } from '../../components/Navbar/Navbar';
import { Box, useMediaQuery } from '@mui/material';
import { Sidebar } from '../../components/Sidebar/Sidebar';

const PageTemplate = () => {
    //material-ui constrain is 600px
    const mobileConstraint = useMediaQuery('(min-width: 600px)');
    const [sidebarState, setSidebarState] = useState(true);
    return (
        <Box display={mobileConstraint ? 'flex' : 'block'} width='100%' height='100%'>
            <Sidebar
                mobileConstraint={mobileConstraint}
                drawerWidth='250px'
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
            />
            <Box flexGrow={1}>
                <Navbar sidebarState={sidebarState} setSidebarState={setSidebarState} />
                <Outlet />
            </Box>
        </Box>
    );
};

export default PageTemplate;
