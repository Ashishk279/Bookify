import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { BookCard } from "../components/Card";
import Typography from '@mui/material/Typography';
import { CardGroup } from "react-bootstrap";

export const OrderPage = () => {
    const firebase = useFirebase()
    const [books , setBooks] = useState([])
    useEffect(() => {
        
        const orders  = async () => {
        if(firebase.isLoggedIn){
           let books = await firebase.fetchMyBooks(firebase.user.uid);
        //    console.log(books.docs)
           setBooks(books.docs)
        }
        }
        orders()
    },[firebase])

    if(!firebase.isLoggedIn) return <Typography variant="h2" gutterBottom>Please Login...</Typography>
    return (
        <div className="container mt-5">
            <CardGroup>
           {
            books.map(book => <BookCard link={`/books/orders/${book.id}`}  key={book.id} id={book.id} {...book.data() } value="View Orders"></BookCard>)
           }
           </CardGroup>
        </div>
    )
}