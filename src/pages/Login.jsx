import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import TextField from '@mui/material/TextField';
import GoogleButton from 'react-google-button'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const LoginPage = () => {
    const firebase = useFirebase();
    // const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // useEffect(()=> {
    //     if(firebase.isLoggedIn){
    //       navigate('/')
    //     }
    // },[firebase, navigate ])

    console.log(email, password, alert)

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        try {
            console.log("SigIn a user...")
            const result = await firebase.signinUserwithEmailAndPassword(email, password)
            toast.success("Successfully Login!", {
               position: "top-right"
              }); 
            console.log("Successfully SignIn", result)
        } catch (error) {
            toast.error(`Login failed! ${error}`, {
                position: "top-right"
              });
        }
    }
    return (
        <div className='container mt-3 ' style={{ width: '28rem' }} >
            <FormControl sx={{ border: '2px solid black', padding: '10px 10px', borderRadius: '13px', boxShadow: '10px 10px 5px #70708b' }}>
                <FormLabel>Email address</FormLabel>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                />

                <FormLabel>Password</FormLabel>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <Button variant="solid"
                    color="primary" onClick={handleCreateAccount} sx={{ margin: '23px 0px', width: '82px' }}>
                    Login
                </Button>

                <GoogleButton type="dark"  label='Signin with google' onClick={firebase.signInWithGoogle} ></GoogleButton>
            </FormControl>
        </div>
    )
}
