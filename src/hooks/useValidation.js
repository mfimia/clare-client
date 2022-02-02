import { useState } from "react";
import emailRegex from "../utils/emailRegex";
import inputFields from "../utils/inputFields";

export const useValidation = () => {
  const [inputs, setInputs] = useState(inputFields);

  const handleFormChange = (index, e) => {
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
              "http://localhost:5000/api/auth/email",
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
          const response = await fetch("http://localhost:5000/api/auth/code", {
            method: "POST",
            body: JSON.stringify({ referred_by: input.value }),
            headers: {
              "Content-Type": "application/json",
            },
          });
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

  return {
    inputs,
    handleValidation,
    handleFormChange,
  };
};
