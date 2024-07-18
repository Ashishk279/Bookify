import React, { useState } from "react";
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/joy';
import { useFirebase } from "../context/firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


export const ListingPage = () => {
    const firebase = useFirebase()
    const [name, setName] = useState('')
    const [isbnNumber, setIsbnNumber] = useState('')
    const [price, setPrice] = useState('')
    const [coverPic, setCoverPic] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState()
    console.log(coverPic)

    const handleSubmit = async (e) => {
        e.preventDefault();
      try {
          await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic, username, avatar)
          toast.success("Successfully Created a Book", {
            position: 'top-right'
          })
      } catch (error) {
        toast.error("Something wents wrong", {
            position: 'top-right'
          })
      }
    }
    return (
        <div className='container mt-5'  style={{width: '28rem'}}> 
        
            <FormControl sx={{border:'2px solid black', padding:'10px 10px', borderRadius: '13px',boxShadow: '10px 10px 5px #70708b' }}>

                <FormLabel>Upload Image</FormLabel>
                <Button
                    onChange={(e) => setAvatar(e.target.files[0])}
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    variant="outlined"
                    color="neutral"
                    startDecorator={
                        <SvgIcon>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                            </svg>
                        </SvgIcon>
                    }
                >
                   {avatar? avatar.name: "Upload an Avatar" } 
                    <VisuallyHiddenInput type="file" />
                </Button>

                <FormLabel>Username</FormLabel>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                />


                <FormLabel>Enter Book Name</FormLabel>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Enter Book name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                />


                <FormLabel>ISBN</FormLabel>
                <TextField
                    required
                    label="ISBN Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="outlined-required"
                    defaultValue="ISBN Number"
                    onChange={(e) => setIsbnNumber(e.target.value)}
                    value={isbnNumber}
                />


                <FormLabel>Price</FormLabel>
                <TextField
                    required
                    label="Price"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="outlined-required"
                    defaultValue="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
                 <FormLabel>Cover Pic</FormLabel>
                <Button
                    onChange={(e) => setCoverPic(e.target.files[0])}
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    variant="outlined"
                    color="neutral"
                 
                    startDecorator={
                        <SvgIcon>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                            </svg>
                        </SvgIcon>
                    }
                >
                    {coverPic? coverPic.name: "Upload a Cover Pic"}
                    <VisuallyHiddenInput type="file" />
                </Button>

                <Button variant="solid"
                    color="primary"  onClick={handleSubmit} sx={{ margin: '23px 0px', width: '82px' }} >
                    Create
                </Button>
            </FormControl>
            <ToastContainer/>
        </div>
    )
}