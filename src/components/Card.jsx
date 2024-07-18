import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFirebase } from '../context/firebase';

export const BookCard = (props) => {
  const firebase = useFirebase()
  const navigate = useNavigate()
  const [url, setUrl] = useState(null);
  
  useEffect(() => {
    const getImage = async() => {
      let url = await firebase.getImageURL(props.imageURL);
      setUrl(url)
    }
    getImage()
  },[firebase, props.imageURL])
    return(
      <>
      <Card sx={{ width: 345, margin: '20px' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image={url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Sold By: {props.displayName} <br></br>Book Cost: Rs.{ props.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={e=> navigate(props.link)}>{props.value}</Button>
      </CardActions>
    </Card>
        
      </>
    )
}