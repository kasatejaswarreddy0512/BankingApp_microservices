import { Button, TextField } from "@mui/material";
import React from "react";

const ToAccount = () => {
  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col">
      <h1 className="text-3xl mb-5 text-green-500">Transfer to Account</h1>

      {/* Account Number Field */}
      <div>
        <div className="flex flex-row mb-4 align-items-center justify-content-center">
          <label
            htmlFor="accountNumber"
            className="text-sm font-medium mb-2 text-white  mt-4"
          >
            Account Number :
          </label>
          <TextField
            id="accountNumber"
            fullWidth
            label="Enter account number"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": { color: "white" }, // text color
              "& .MuiInputLabel-root": { color: "white" }, // label color
              marginLeft: "20px",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
          />
        </div>

        {/* Ifsc code */}
        <div className="flex flex-row mb-4 align-items-center justify-content-center">
          <label
            htmlFor="ifscCode"
            className="text-sm font-medium mb-2 text-white  mt-4"
          >
            IFSC code :
          </label>
          <TextField
            id="ifscCode"
            fullWidth
            label="Enter IFSC code"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": { color: "white" }, // text color
              "& .MuiInputLabel-root": { color: "white" }, // label color
              marginLeft: "70px",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
          />
        </div>

        {/* Amount */}
        <div className="flex flex-row mb-4 align-items-center justify-content-center">
          <label
            htmlFor="amount"
            className="text-sm font-medium mb-2 text-white  mt-4"
          >
            Amount :
          </label>
          <TextField
            id="amount"
            fullWidth
            label="Enter amount"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": { color: "white" }, // text color
              "& .MuiInputLabel-root": { color: "white" }, // label color
              marginLeft: "82px",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
          />
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "10px", width: "200px" }}
      >
        Transfer
      </Button>
    </div>
  );
};

export default ToAccount;
