import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Box,
} from "@mui/material";
import useAxios from "../services/useAxios";

/**
 * This `Search` component allows users to search for books based on a specific criteria (name, author, or genre).
 * It fetches data from the server and updates the book list in real time as the user searches.
 */
const Search = ({ updateBooks }) => {
  const [searchBy, setSearchBy] = useState("name"); // Tracks the selected search category
  const [searchTerm, setSearchTerm] = useState(""); // Tracks the search term entered by the user
  const { data, alert, loading, get, post, update, remove } = useAxios(
    "http://localhost:3000"
  );

  useEffect(() => {
    // Updates the displayed books based on the search term and selected category
    if (searchTerm !== "") {
      const filteredBooks = data?.filter((book) =>
        book[searchBy].toString().includes(searchTerm)
      );
      if (filteredBooks) updateBooks(filteredBooks);
    } else {
      updateBooks(data);
    }
  }, [data]); // Triggers whenever the fetched data changes

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value); // Updates the search category (e.g., name, author, genre)
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value); // Updates the search term input
  };

  const handleSearch = () => {
    get("books"); // Fetches the list of books from the server
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search Term"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchTermChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchTerm(""); // Clears the search term
                handleSearch(); // Triggers the search
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="search-by-label">Search By</InputLabel>
            <Select
              labelId="search-by-label"
              value={searchBy}
              label="Search By"
              onChange={handleSearchByChange}
            >
              <MenuItem value="name">name</MenuItem>
              <MenuItem value="author">author</MenuItem>
              <MenuItem value="genre">genre</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
