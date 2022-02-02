import { Box, Card, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const EmailsList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch emails when component mounts
  useEffect(() => {
    const getEmailsList = async () => {
      const res = await fetch("http://localhost:5000/api/users/email");
      const data = await res.json();
      setEmails(data);
      setLoading(false);
    };
    getEmailsList();
  }, []);

  return (
    <Box mt={6} textAlign={"center"} maxWidth={"50%"} mx={"auto"}>
      <Card
        style={{ overflow: "auto" }}
        elevation={3}
        sx={{ p: 4, minHeight: "40vh", maxHeight: "70vh" }}
      >
        <Typography
          fontFamily={"Roboto Slab"}
          fontWeight={300}
          my={4}
          component={"h4"}
          variant="h4"
        >
          List of emails
        </Typography>
        {loading ? (
          <Spinner />
        ) : (
          <List>
            {emails.map((email) => (
              <ListItem key={email.email}>
                <Typography fontFamily={"Roboto Slab"}>
                  {email.email}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Card>
    </Box>
  );
};

export default EmailsList;
