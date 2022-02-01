import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import emailRegex from "../utils/emailRegex";
import inputFields from "../utils/inputFields";
import AddedUserScreen from "./AddedUserScreen";

const UserForm = () => {
  const [inputs, setInputs] = useState(inputFields);
  const [completed, setCompleted] = useState(false);
  const [refCode, setRefCode] = useState("");

  // console.log(refCodes);
  const handleChange = (index, e) => {
    setInputs((prev) =>
      prev.map((input, i) =>
        i === index ? { ...input, value: e.target.value } : input
      )
    );
  };

  const handleValidation = () => {
    // clean errors and valid fields from previous submit
    setInputs((prev) =>
      prev.map((x) => ({ ...x, error: false, valid: false }))
    );

    // check for errors
    inputs.forEach((input, index) => {
      // check for required fields
      if (input.value === "" && input.name !== "referred_by") {
        setInputs((prev) =>
          prev.map((inp, i) =>
            i === index
              ? { ...inp, error: { value: true, message: "Required field" } }
              : inp
          )
        );
        // if all required fields are filled, check email format
      } else if (input.name === "email") {
        if (!emailRegex.test(input.value)) {
          setInputs((prev) =>
            prev.map((inp) =>
              inp.name === "email"
                ? {
                    ...inp,
                    error: {
                      value: true,
                      message: "Please enter a valid email format",
                    },
                  }
                : inp
            )
          );
        } else {
          const checkEmail = async () => {
            const response = await fetch(
              "http://localhost:5000/api/users/auth/email",
              {
                method: "POST",
                body: JSON.stringify({ email: input.value }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            if (!data.success) {
              setInputs((prev) =>
                prev.map((inp) =>
                  inp.name === "email"
                    ? {
                        ...inp,
                        error: {
                          value: true,
                          message: "Email already in use",
                        },
                      }
                    : inp
                )
              );
            } else {
              setInputs((prev) =>
                prev.map((inp) =>
                  inp.name === "email" ? { ...inp, valid: true } : inp
                )
              );
            }
          };
          checkEmail();
        }
        // validate referral code
      } else if (input.name === "referred_by" && input.value !== "") {
        const checkCode = async () => {
          const response = await fetch(
            "http://localhost:5000/api/users/auth/code",
            {
              method: "POST",
              body: JSON.stringify({ referred_by: input.value }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (!data.success) {
            setInputs((prev) =>
              prev.map((inp) =>
                inp.name === "referred_by"
                  ? {
                      ...inp,
                      error: {
                        value: true,
                        message: "Please enter a valid code",
                      },
                    }
                  : inp
              )
            );
          } else {
            setInputs((prev) =>
              prev.map((inp) =>
                inp.name === "referred_by" ? { ...inp, valid: true } : inp
              )
            );
          }
        };
        checkCode();
      } else {
        // if no errors, input becomes valid
        setInputs((prev) =>
          prev.map((inp, i) => (i === index ? { ...inp, valid: true } : inp))
        );
      }
    });
  };

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
                  required={input.name === "referred_by" ? false : true}
                  onChange={(e) => handleChange(index, e)}
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
