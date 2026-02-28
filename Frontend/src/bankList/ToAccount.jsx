import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const ToAccount = () => {
  const [formData, setFormData] = useState({
    fromAccountNumber: "",
    toAccountNumber: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Account Transfer Data Submitted:", formData);
    // call backend API here
  };

  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col w-[880px] mx-auto mt-10">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl mb-6 text-green-500 text-center font-semibold">
          Account Transfer
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          id="fromAccountNumber"
          fullWidth
          label="Enter From Account Number"
          value={formData.fromAccountNumber}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          sx={{
            marginBottom: "30px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />

        {/* Account Number */}
        <TextField
          id="toAccountNumber"
          fullWidth
          label="Enter To Account Number"
          value={formData.toAccountNumber}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          sx={{
            marginTop: "20px",
            marginBottom: "30px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />

        {/* Amount */}
        <TextField
          id="amount"
          type="number"
          fullWidth
          label="Enter Amount"
          value={formData.amount}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          sx={{
            marginBottom: "30px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: "10px",
            borderRadius: "8px",
            width: "200px",
            marginLeft: "320px",
          }}
        >
          Transfer
        </Button>
      </form>
    </div>
  );
};

export default ToAccount;
