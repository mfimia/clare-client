import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
};

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              letterSpacing: 4,
              ml: 4,
              fontFamily: "Roboto Slab",
              color: "white",
            }}
          >
            <Link color="white" style={linkStyle} to="/">
              Clare
            </Link>
          </Typography>
          <Stack spacing={2} direction="row">
            <Link style={linkStyle} to="/emails">
              <Button
                sx={{ color: "white", borderColor: "white" }}
                variant="outlined"
              >
                Emails
              </Button>
            </Link>
            <Link style={linkStyle} to="/referrals-list">
              <Button
                sx={{ color: "white", borderColor: "white" }}
                variant="outlined"
              >
                Referrals
              </Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
