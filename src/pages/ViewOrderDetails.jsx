import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { Button, CardGroup } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
export const ViewOrderDetails = () =>{
    const params = useParams();
    const firebase = useFirebase();

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const order = async() => {
            const details = await firebase.getOrders(params.bookId);
            setOrders(details.docs)
        }
        order()
    }, [firebase, params.bookId]);

    const deleteOrder = () => {
        try{

        }catch(error){

        }
    }
    return (
      <div className="container mt-3">
        <Routes>
         <Route path='/books/orders/:bookId/detail/:orderId' element={<ViewOrderDetails />} />
        </Routes>
        <h1>Orders</h1>
        <CardGroup>
       {
        orders.map(order => {
            const data = order.data()
            return <div key={order.id} className="mt-5" style={{border:'1px solid black', padding: '20px', width: '23rem', margin: "10px 10px"}}>
                <h5>Order By: {data.displayName} </h5>
                <h6>Qty: {data.qty}</h6>
                <p>Email: {data.userEmail}</p>
                <Button>Click Order</Button>
                <DeleteIcon onClick={deleteOrder}/>
            </div>
        })
       }
       </CardGroup>
      </div>
    )
}