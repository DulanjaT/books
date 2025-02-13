import { Link } from "react-router-dom";
import { Button, Box, AppBar, Toolbar, Typography } from "@mui/material";

/**
 * This function defines the `Header` component, which serves as the navigation bar for the application.
 * It includes links to the home page and the "Add New" page using Material-UI components for a clean and modern design.
 */
function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Books
            </Typography>
          </Typography>

          <Button color="inherit" variant="text" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" variant="text" component={Link} to="/addnew">
            Add New
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
