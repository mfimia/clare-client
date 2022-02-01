import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AddedUserScreen = ({ refCode }) => {
  return (
    <Box py={2} display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <CheckCircleOutlineIcon color="success" style={{ fontSize: "70px" }} />
      <Typography
        color={"success.main"}
        fontFamily={"Roboto Slab"}
        my={2}
        component="h4"
        variant="h3"
      >
        SUCCESS
      </Typography>
      <Typography fontFamily={"Roboto Slab"} my={2} component="h4" variant="h5">
        Thank you for registering with Clare!
      </Typography>
      <Typography fontFamily={"Roboto Slab"} my={2} component="h4" variant="h6">
        Now you can also refer friends with your referral code:
      </Typography>
      <Box>
        <Typography
          color={"primary"}
          fontWeight={700}
          fontFamily={"Roboto Slab"}
          component={"p"}
          fontSize={28}
        >
          {refCode}
        </Typography>
      </Box>
      <Typography fontFamily={"Roboto Slab"} my={2} component="h4" variant="h6">
        Make sure to save it!
      </Typography>
      {/* when done, navigate back to homepage */}
      <Link to={"/"}>
        <Button sx={{ mt: 2 }} variant="outlined" style={{ fontSize: "20px" }}>
          got it!
        </Button>
      </Link>
    </Box>
  );
};

AddedUserScreen.propTypes = {
  refCode: PropTypes.string.isRequired,
};

export default AddedUserScreen;
