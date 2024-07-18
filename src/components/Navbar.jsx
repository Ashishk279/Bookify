import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from '@mui/joy/Button';
import Navbar from 'react-bootstrap/Navbar';
import book from "../assets/books.png"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFirebase } from '../context/firebase';
import { LoginPage } from '../pages/Login';
import { RegisterPage } from '../pages/Register';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const MyNavbar = () => {
  const firebase = useFirebase()
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);


  const logout = async () => {
    console.log("Signout...")
    await firebase.signOutUser();
    setShow(false)
    toast.success("Successfully Logout", {
      position: "top-right"
    })
    console.log("Successfully logout")
  }
  useEffect(() => {
    if (firebase.isLoggedIn) {
      setShow(true)
    }
  }, [firebase])

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><img src={book} alt="Logo" style={{ height: "3rem" }} className="d-inline-block align-top"
        /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listing</Nav.Link>
            <Nav.Link href="/book/orders">Orders </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {!show ? <>
          <Button size="md" variant='solid' color="primary" sx={{ margin: '0px 10px' }} onClick={handleOpen}>
            Login
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <LoginPage/>
               
              </Typography>
            </Box>
          </Modal>
          
          <Button size="md" variant='solid' color="primary" sx={{ margin: '0px 10px' }} onClick={handleOpen1} >
             Register
          </Button>
          <Modal
            open={open1}
            onClose={handleClose1}
          >
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <RegisterPage/>
              </Typography>
            </Box>
          </Modal>

        </> : <>
          <Button size="md" variant='solid' color="primary" onClick={logout} sx={{ margin: '0px 10px' }}>
            Logout
          </Button>

        </>
        } 
        <ToastContainer/>
      </Container>
    </Navbar>
  )
}
