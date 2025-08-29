import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const Withdrawals = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
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
    console.log("Withdrawal Data Submitted:", formData);
    // 👉 Call backend API here
    // axios.post(`/withdraw/${formData.accountNumber}?amount=${formData.amount}`);
  };

  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col w-[880px] mx-auto mt-10">
      <h1 className="text-3xl mb-6 text-red-500 text-center font-semibold">
        Fund Withdrawal
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Account Number */}
        <TextField
          id="accountNumber"
          fullWidth
          label="Enter Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          variant="outlined"
          sx={{
            marginBottom: "30px",
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
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
          variant="outlined"
          sx={{
            marginBottom: "30px",
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
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
          Withdraw
        </Button>
      </form>
    </div>
  );
};

export default Withdrawals;
