import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid, Box } from '@mui/material';
import useAxios from '../services/useAxios';


const Search = ({updateBooks}) => {
  const [searchBy, setSearchBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, alert, loading, get, post, update, remove } = useAxios(
    'http://localhost:3000'
  );

  useEffect(() => {
    if (searchTerm !== '') {
        const filteredBooks = data?.filter((book) => {return book[searchBy].toString().includes(searchTerm)});
        if(filteredBooks) updateBooks(filteredBooks);
    } else {
        updateBooks(data);
    }
  }, [data]);

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    get('books');
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
            <TextField
                label="Search Term"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchTermChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        searchTerm('')
                        handleSearch();
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
