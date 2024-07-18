import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterPage = () => {
    const firebase = useFirebase();
    // const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // useEffect(()=> {
    //     if(firebase.isLoggedIn){
    //       navigate('/')
    //     }
    // },[firebase, navigate ])
    const handleCreateAccount = async (e) => {
        e.preventDefault();
        
        try {
            console.log("Signup a user...")
            const result = await firebase.signupUserWithEmailAndPassword(email, password)
            console.log("Successfully Signup", result)
            toast.success("Successfully Register!", {
                position: "top-right"
               })
        } catch (error) {
            toast.error(`Register Failed! ${error}`, {
                position: "top-right"
               })
        }
    }
    return (
        <div className='container mt-3'  style={{width: '28rem'}}>
            <FormControl  sx={{border:'2px solid black', padding:'10px 10px', borderRadius: '13px',boxShadow: '10px 10px 5px #70708b' }}>

                <FormLabel>Email address</FormLabel>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                />
                <p>
                We'll never share your email with anyone else.
            </p>

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
                color="primary" onClick={handleCreateAccount}  sx={{ margin: '23px 0px', width: '138px' }}>
                Create Account
            </Button>
        </FormControl>
        </div >
    )
}
