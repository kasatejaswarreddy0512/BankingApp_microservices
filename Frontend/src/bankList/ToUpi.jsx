import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { transferMoneyToUpi } from "../Redux-Toolkit/TransactionSlice";

const ToUpi = () => {
  const dispatch = useDispatch();
  const token =
    useSelector((state) => state.auth?.token || state.auth?.jwt || state.auth?.accessToken) ||
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    fromUpi: "",
    toUpi: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Token missing! Please login again.");
      return;
    }
    try {
      await dispatch(
        transferMoneyToUpi({
          fromUpi: formData.fromUpi,
          toUpi: formData.toUpi,
          amount: Number(formData.amount),
          token: token, // ✅ pass token
        })
      ).unwrap();


      alert("Money Transfer Successfully...!");

      setFormData({
        fromUpi: "",
        toUpi: "",
        amount: "",
      });
    } catch (error) {
      alert("Transfer failed: " + error.message);
    }
    // Here you can call your backend API
  };

  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col w-[880px] mx-auto mt-10">
      <h1 className="text-2xl mb-6 text-center text-green-500 font-semibold">
        UPI Transfer
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <TextField
          fullWidth
          label="From UPI ID"
          name="fromUpi"
          value={formData.fromUpi}
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

        <TextField
          fullWidth
          label="To UPI ID"
          name="toUpi"
          value={formData.toUpi}
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

        <TextField
          fullWidth
          type="number"
          label="Amount"
          name="amount"
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

export default ToUpi;
