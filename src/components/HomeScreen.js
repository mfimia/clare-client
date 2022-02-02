import { Box, Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <Box mt={6} textAlign={"center"} maxWidth={"50%"} mx={"auto"}>
      <Card sx={{ p: 4 }} elevation={3}>
        <Typography
          fontFamily={"Roboto Slab"}
          my={2}
          component={"h2"}
          variant="h2"
        >
          Welcome to Clare!
        </Typography>
        <Typography
          fontFamily={"Roboto Slab"}
          fontWeight={300}
          my={4}
          component={"h4"}
          variant="h4"
        >
          Don't have an account?
        </Typography>
        <Link to={"/signup"}>
          <Button sx={{ mt: 4 }} style={{ fontSize: "20px" }}>
            Sign Up
          </Button>
        </Link>
      </Card>
    </Box>
  );
};

export default HomeScreen;
