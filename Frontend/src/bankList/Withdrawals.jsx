import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withdrawMoney } from "../Redux-Toolkit/TransactionSlice";

const Withdrawals = () => {
  const dispatch = useDispatch();

  // ✅ Get token from Redux OR localStorage (safe)
  const token =
    useSelector(
      (state) =>
        state.auth?.token || state.auth?.jwt || state.auth?.accessToken
    ) ||
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Token missing! Please login again.");
      return;
    }

    try {
      await dispatch(
        withdrawMoney({
          accountNumber: formData.accountNumber,
          amount: Number(formData.amount),
          token,
        })
      ).unwrap();

      alert("Withdrawal Successful...!🎉🎉");

      setFormData({
        accountNumber: "",
        amount: "",
      });
    } catch (error) {
      alert("Withdrawal Failed: " + (error || "Unknown error"));
    }
  };

  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col w-[880px] mx-auto mt-10">
      <h1 className="text-3xl mb-8 text-red-500 text-center font-semibold">
        Fund Withdrawal
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <TextField
          id="accountNumber"
          fullWidth
          label="Enter Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          variant="outlined"
          sx={{
            marginTop: "20px",
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