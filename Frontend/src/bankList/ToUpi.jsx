import { Button, TextField } from "@mui/material";
import React from "react";

const ToUpi = () => {
  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col">
      <div className="pr-6 mt-4 details"></div>
      <h1 className="text-3xl mb-5 text-green-500">Transfer to UPI</h1>
      <div>
        <div className="flex flex-row mb-4 align-items-center justify-content-center">
          <label
            htmlFor="upi"
            className="text-sm font-medium mb-2 text-white  mt-4"
          >
            From UPI ID :
          </label>
          <TextField
            id="upi"
            fullWidth
            label="Enter UPI ID"
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

        <div className="flex flex-row mb-4 align-items-center justify-content-center">
          <label
            htmlFor="upi"
            className="text-sm font-medium mb-2 text-white  mt-4"
          >
            To UPI ID :
          </label>
          <TextField
            id="upi"
            fullWidth
            label="Enter UPI ID"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": { color: "white" }, // text color
              "& .MuiInputLabel-root": { color: "white" }, // label color
              marginLeft: "38px",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
          />
        </div>

        <div className="flex flex-row mb-4 align-items-center justify-content-center">
          <label
            htmlFor="upi"
            className="text-sm font-medium mb-2 text-white  mt-4"
          >
            Amount :
          </label>
          <TextField
            id="amount"
            fullWidth
            label="Enter Amount"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": { color: "white" }, // text color
              "& .MuiInputLabel-root": { color: "white" }, // label color
              marginLeft: "48px",
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

export default ToUpi;
