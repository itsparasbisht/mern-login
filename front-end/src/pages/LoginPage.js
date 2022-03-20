import React from 'react'
import './loginPage.css'
import './signupPage.css'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import validator from 'validator';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [cPasswordError, setCPasswordError] = useState(false)

    const [disableSignUp, setDisableSignUp] = useState(false)
    const [error, setError] = useState(false)

    return (
        <div className='login__container'>
            <div className='signup__container-block block1 login__form' style={{ width: '100%' }}>
                <div className='signup__container-form'>
                    <div className='signup__container-formHeader'>
                        <img src='/resources/our-logo.webp' alt="" />
                        <span>Foxconn Industries</span>
                    </div>
                    <div className='signup__container-formBody'>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '80%' },
                            }}
                            noValidate
                            autoComplete="off"
                            className='signup__container-formBody'
                        >
                            <Tooltip disableFocusListener title="username should be alpha-numeric" placement="right-start">
                                <TextField error={usernameError} fullWidth={true} value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="username" variant="outlined" />
                            </Tooltip>

                            <Tooltip disableFocusListener title="provide a strong password (use upper and lower cases with digits and special characters, min 8 characters)" placement="right-start">
                                <TextField error={passwordError} type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} fullWidth={true} id="outlined-basic" label="password" variant="outlined" />
                            </Tooltip>

                        </Box>

                        <Stack className='signup__container-formBodyButtons' spacing={2} direction="row">
                            <Button disabled={disableSignUp} variant="contained">Login</Button>
                            <Button variant="text">Reset</Button>
                        </Stack>
                    </div>
                    <div className='signup__container-footer'>
                        <p><Link className="link" to='/log-in'>sign up</Link> to create an account</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage