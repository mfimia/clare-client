import { Box, capitalize, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const ReferralsList = () => {
  const [loading, setLoading] = useState(true);
  const [mostRef, setMostRef] = useState({
    email: "",
    first_name: "",
    last_name: "",
    length: 0,
  });

  useEffect(() => {
    const getEmailsList = async () => {
      const res = await fetch("http://localhost:5000/api/users/referrals");
      const data = await res.json();
      setMostRef(data);
      setLoading(false);
    };
    getEmailsList();
  }, []);

  return (
    <Box mt={6} textAlign={"center"} maxWidth={"50%"} mx={"auto"}>
      <Card sx={{ p: 4, minHeight: "40vh" }} elevation={3}>
        <Typography
          fontFamily={"Roboto Slab"}
          fontWeight={300}
          my={4}
          component={"h4"}
          variant="h4"
        >
          Most referrals
        </Typography>

        {loading ? (
          <Spinner />
        ) : (
          <Box>
            <Typography
              fontFamily={"Roboto Slab"}
              my={2}
              color={"primary.main"}
              component={"h4"}
              variant="h5"
            >
              {capitalize(mostRef.first_name)} {capitalize(mostRef.last_name)}
            </Typography>
            <Typography
              fontFamily={"Roboto Slab"}
              my={2}
              color={"GrayText"}
              component={"h5"}
            >
              ({mostRef.email})
            </Typography>

            <Typography fontFamily={"Roboto Slab"} fontSize={30} mt={4}>
              {mostRef.length}
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default ReferralsList;
