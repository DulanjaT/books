import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box, CardMedia } from '@mui/material';
import useAxios from '../services/useAxios';

export default function Book () {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { data, alert, loading, get, post, update, remove } = useAxios(
    'http://localhost:3000'
  );

  useEffect(() => {
    console.log(`id ${id}`)
    get('books');
  }, []);

  useEffect(() => {
    if(data){
      setBook(data?.find((book) => book.id == id));
    }
  },[data])


  return (
    book && <Card sx={{ maxWidth: 345, margin: '20px', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={book.img}
        alt={`Cover of ${book?.name}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book?.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Author: {book?.author}
        </Typography>
        <Typography variant="body1" color="text.primary" paragraph>
          Genres: {book?.genres.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Read from: {new Date(book?.start).toLocaleDateString()} to {new Date(book?.end).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Rating: {book?.stars} Stars
        </Typography>
      </CardContent>
      </Card>
  );
};