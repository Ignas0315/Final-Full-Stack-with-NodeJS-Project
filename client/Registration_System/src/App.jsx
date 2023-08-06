import { useContext, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './themes';
import { useSelector } from 'react-redux';

// const App = () => {
//     return <></>;
// };

const App = () => {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={routes} />;
        </ThemeProvider>
    );
};

export default App;
