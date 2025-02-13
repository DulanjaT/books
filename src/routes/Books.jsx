import { useEffect, useState } from "react";
import useAxios from "../services/useAxios";
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
} from "@mui/material";
import Search from "../components/Search";
import { Link } from "react-router-dom";

/**
 * The `Books` component fetches and displays a list of books.
 * It also provides a search functionality to filter the displayed books.
 */
function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, alert, loading, get, post, update, remove } = useAxios(
    "http://localhost:3000"
  );

  useEffect(() => {
    /**
     * Fetches the list of books from the server when the component mounts
     * if the books list is currently empty.
     */
    if (books?.length === 0) {
      getBooks();
    }
  }, []);

  useEffect(() => {
    /**
     * Updates the `books` state whenever the fetched data changes.
     */
    if (data != undefined) setBooks(data);
  }, [data]);

  /**
   * Fetches the list of books from the server.
   */
  async function getBooks() {
    get("books");
  }

  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} justifyContent={"center"}>
              <Search
                updateBooks={(books) => {
                  if (data != undefined) setBooks(books);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} justifyContent={"center"}>
              <Stack
                sx={{ justifyContent: "space-around" }}
                spacing={{ xs: 1 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
              >
                {books?.map((book) => (
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15%",
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
                        justifyContent: "space-between",
                        mt: "auto",
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
