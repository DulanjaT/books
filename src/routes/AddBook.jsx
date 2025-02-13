import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import { DateField } from "@mui/x-date-pickers/DateField";
import useAxios from "../services/useAxios";
import { bookGenres } from "../genres";
import { Stack, Typography } from "@mui/material";

/**
 * The `AddBook` component allows users to add a new book by entering details like title, author, genres, completion status, and rating.
 * It sends the book data to the server using the `post` function.
 */
function AddBook() {
  const { alert, post } = useAxios("http://localhost:3000");
  const [rateValue, setRateValue] = useState(3);
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState({
    author: "",
    name: "",
    genres: [],
    completed: false,
    start: null,
    img: "https://i.postimg.cc/FKTmS57v/kourosh-qaffari-Rrhhzit-Yizg-unsplash.jpg",
    end: null,
    stars: null,
  });

  useEffect(() => {
    /**
     * Displays an alert when there is a server response and hides it after 5 seconds.
     */
    if (alert) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
  }, [alert]);

  /**
   * Handles changes to the selected genres for the book.
   */
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === "string" ? value.split(",") : value,
    });
  };

  /**
   * Handles changes to the book's star rating.
   */
  const rateChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      stars: value,
    });
  };

  /**
   * Handles changes to book details such as title, author, image URL, and completion status.
   */
  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox" && name === "completed") {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  /**
   * Sends the book data to the server when the form is submitted.
   */
  function postHandler(e) {
    e.preventDefault();
    post("books", book);
  }

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: "auto", width: "25%" }}
      >
        {alert.show && open && (
          <Alert severity={alert.type}>{alert.message}</Alert>
        )}
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />
        <Stack spacing={1}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="stars"
              value={rateValue}
              onClick={rateChangeHandler}
              size="large"
              onChange={(event, newValue) => {
                setRateValue(newValue);
              }}
            />
          </div>
        </Stack>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
