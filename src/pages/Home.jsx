import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { BookCard } from "../components/Card";
import { CardGroup } from "react-bootstrap";
export const HomePage = () => {
    const firebase = useFirebase()
    const [books, setBooks] = useState([])
    

    useEffect(() => {
        let listOfBooks = async () => {
            const books = await firebase.listAllBooks()
            setBooks(books.docs)
        }
        listOfBooks()
    },[firebase])

    return (
        <div className="container mt-5">
            <CardGroup>
           {books?.map((book)=>{
            return <BookCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} value="View"/>
           })}
           </CardGroup>
        </div>
    )
}