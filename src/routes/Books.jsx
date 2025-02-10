import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  Grid,
} from '@mui/material';
import Search from '../components/Search';
import { Link } from 'react-router-dom';


function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, alert, loading, get, post, update, remove } = useAxios(
    'http://localhost:3000'
  );


  useEffect(() => {
    if (books?.length === 0) {
      getBooks();
    }
  }, []);

  useEffect(() => {
    if(data != undefined)
      setBooks(data);
  }, [data]);

  async function getBooks() {
    get('books');
  }

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Grid container spacing={2}>  
            <Grid item xs={12} sm={12} justifyContent={'center'}>
              <Search updateBooks={(books) => {
                if(data != undefined)
                  setBooks(books);
              }}/>
            </Grid>
            <Grid item xs={12} sm={12} justifyContent={'center'}>
            <Stack
              sx={{ justifyContent: 'space-around' }}
              spacing={{ xs: 1 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              {books?.map((book) => (
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '15%',
                    minWidth: 200,
                  }}
                  key={book.name}
                  to={"/book/" + book.id}
                  component={Link}
                >
                  <CardMedia
                    sx={{ height: 250 }}
                    image={book.img}
                    title={book.name}
                  />
                  <Box sx={{ pt: 2, pl: 2 }}>
                    {book.genres.map((genre, i) => (
                      <Chip
                        key={i}
                        label={genre}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                    <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {book.author}
                    </Typography>
                  </Box>
                  <CardActions
                    sx={{
                      justifyContent: 'space-between',
                      mt: 'auto',
                      pl: 2,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={book.stars}
                      readOnly
                      size="small"
                    />
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              ))}
            </Stack>
            </Grid>
          </Grid>
        </div>
      )}
    </Box>
  );
}

export default Books;
