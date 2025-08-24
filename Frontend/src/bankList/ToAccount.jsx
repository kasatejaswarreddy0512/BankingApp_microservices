import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const ToAccount = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    ifscCode: "",
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
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col w-[800px] mx-auto mt-10">
      <h1 className="text-2xl mb-6 text-green-500 text-center font-semibold">
        Account Transfer
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account Number */}
        <TextField
          id="accountNumber"
          fullWidth
          label="Enter Account Number"
          value={formData.accountNumber}
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

        {/* IFSC Code */}
        <TextField
          id="ifscCode"
          fullWidth
          label="Enter IFSC Code"
          value={formData.ifscCode}
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
            marginLeft: "250px",
          }}
        >
          Transfer
        </Button>
      </form>
    </div>
  );
};

export default ToAccount;
