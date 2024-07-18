import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/firebase'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const BookDetailPage = () => {
    const param = useParams()
    const firebase = useFirebase()
    const [user, setUser] = useState()
    const [qty, setQty] = useState(1);
    const [data, setData] = useState(null)
    const [url, setUrl] = useState(null)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(data)
    console.log(url)

    useEffect(() => {
        const getBookDetails = async () => {
            let details = await firebase.getBookById(param.bookId)
            setData(details.data())
        }
        getBookDetails()

    }, [firebase, param.bookId])

    useEffect(() => {
        const getURL = async () => {
            if (data) {
                const imageURL = data.imageURL;
                console.log(imageURL)

                const getImage = await firebase.getImageURL(imageURL)
                setUrl(getImage)
            }
        }
        getURL()
    }, [data, firebase])

    const placeOrder = async () => {
        try {
            const result = firebase.placeOrder(param.bookId, qty, user)
            toast.success("Successfully Place Order", {
                position: 'top-right'
            })
            console.log("Order Placed", result)
        } catch (error) {
            toast.error("Order Place failed", {
                position: 'top-right'
            })
        }
    }

    if (data == null) return <h1>Loding...</h1>
    return (
        <div className='container mt-5'>
            <h1>{data.name}</h1>
            <img src={url} alt='' width="100%" height='500px' style={{ borderRadius: '10px' }} />
            <h1>Details</h1>
            <p>Price: Rs. {data.price}</p>
            <p>ISBN Number: {data.isbn}</p>
            <h4>Owner Details</h4>
            <p>Name: {data.displayName}</p>
            <p>Email: {data.userEmail}</p>

            <Button variant="contained" onClick={handleOpen} >Buy Now</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Place Order
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Order By
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        type="text"
                    />
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Qty
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        onChange={(e) => setQty(e.target.value)}
                        value={qty}
                        type="number"
                    />
                    <br></br>
                    <Button variant="contained" color='primary' onClick={placeOrder} sx={{margin: '20px 0px'}}>Buy Now</Button>
                </Box>
            </Modal> 
            <ToastContainer/>
        </div>
    )
}
