import { useState } from "react";
import emailRegex from "../utils/emailRegex";
import inputFields from "../types/inputFields";

export const useFormHandler = () => {
  const [inputs, setInputs] = useState(inputFields);

  const handleFormChange = (index, e) => {
    setInputs((prev) =>
      prev.map((input, i) =>
        i === index ? { ...input, value: e.target.value } : input
      )
    );
  };

  const handleError = (field, message) => {
    setInputs((prev) =>
      prev.map((input) => {
        return input.name === field
          ? { ...input, valid: false, error: { value: true, message } }
          : input;
      })
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
          setInputs((prev) =>
            prev.map((inp) =>
              inp.name === "email" ? { ...inp, valid: true } : inp
            )
          );
        }
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
    handleError,
  };
};
