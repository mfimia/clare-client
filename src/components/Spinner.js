import { CircularProgress, Box } from "@mui/material";

const Spinner = () => {
  return (
    <Box
      style={{
        width: "200px",
        margin: "auto",
        display: "block",
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
