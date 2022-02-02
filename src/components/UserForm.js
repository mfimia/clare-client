import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useFormHandler } from "../hooks/useFormHandler";
import AddedUserScreen from "./AddedUserScreen";

const UserForm = () => {
  const { inputs, handleValidation, handleFormChange } = useFormHandler();
  const [completed, setCompleted] = useState(false);
  const [refCode, setRefCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };

  useEffect(() => {
    // add fields that are valid
    const validFields = inputs.filter((input) => input.valid);

    // if everything is validated, sign up user
    if (validFields.length === inputs.length) {
      const registerUser = async () => {
        // create user object
        const user = {};
        inputs.forEach((input) =>
          Object.assign(user, { [input.name]: input.value })
        );

        // hit endpoint
        const res = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        // storing referral code
        setRefCode(data.referral_code);
        setCompleted(true);
      };
      registerUser();
    }
  }, [inputs]);

  return (
    <Box sx={{ maxWidth: "50%", mx: "auto", my: 6 }}>
      <Paper
        elevation={2}
        children={
          completed ? (
            <AddedUserScreen refCode={refCode} />
          ) : (
            <Box
              component="form"
              autoComplete="off"
              onSubmit={handleSubmit}
              display={"flex"}
              flexDirection={"column"}
              p={4}
            >
              {inputs.map((input, index) => (
                <TextField
                  key={input.name}
                  error={input.error.value}
                  helperText={input.error.message}
                  name={input.name}
                  value={input.value}
                  required={input.name === "referred_by" ? false : true}
                  onChange={(e) => handleFormChange(index, e)}
                  label={input.label}
                  sx={{ my: 2 }}
                />
              ))}

              <Button
                sx={{ width: 120, mx: "auto" }}
                variant="outlined"
                onClick={handleSubmit}
              >
                sign up
              </Button>
            </Box>
          )
        }
      />
    </Box>
  );
};

export default UserForm;
