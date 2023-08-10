import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../api/login-api';
import {
    Avatar,
    Box,
    Button,
    Container,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Paper,
    Grid,
    TextField,
    ThemeProvider,
    Typography,
} from '@mui/material';
// import { Copyright } from '@mui/icons-material';
import { LockOutlined } from '@mui/icons-material';
import useAdminDetails from '../../hooks/useAdminDetails';
import { AuthContext } from '../../contexts/AuthContext';

const Copyright = () => {
    return (
        <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyright © '}
            <a href='https://github.com/Ignas0315'>Ignas Žakaitis </a>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const Login = () => {
    console.log('entered login');
    const navigate = useNavigate();

    const { updateAuth, expiry } = useContext(AuthContext);

    const imagineAPICall = (token) => updateAuth(token);

    const getTimeLeft = () => console.log(expiry - Date.now());

    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(JSON.stringify(userInput)).then((res) => {
                if (res.status === 200) {
                    alert('Login successfull');

                    const token = localStorage.setItem('token', res.data.token);

                    window.document.cookie = `id=${res.data.id}`;

                    imagineAPICall(token);

                    navigate('/home');
                } else {
                    setError('Wrong Email or Password. Please try again.');
                }
            });

            if (res.err) throw new Error(res.err);

            // if (pathname === '/home') {
            //     window.location.reload();
            // }
        } catch (error) {}
    };
    {
        return (
            <>
                <Grid container component='main' sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light'
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 18,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlined />
                            </Avatar>
                            <Typography component='h1' variant='h5'>
                                Sign in
                            </Typography>
                            <Typography sx={{ color: '#c50000', mt: 4 }}>{error}</Typography>
                            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                    autoFocus
                                    onChange={(event) =>
                                        setUserInput((prev) => ({
                                            ...prev,
                                            email: event.target.value,
                                        }))
                                    }
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                    onChange={(event) =>
                                        setUserInput((prev) => ({
                                            ...prev,
                                            password: event.target.value,
                                        }))
                                    }
                                />
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 4, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </>
        );
    }
};

export default Login;
