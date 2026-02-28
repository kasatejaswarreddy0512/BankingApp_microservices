import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, depositMoney } from "../Redux-Toolkit/TransactionSlice";

const Deposits = () => {
  const dispatch = useDispatch();

  // ✅ Get token from Redux OR localStorage (fix for "Token missing")
  const token =
    useSelector(
      (state) =>
        state.auth?.token || state.auth?.jwt || state.auth?.accessToken
    ) ||
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken");

  const { loading, error, lastTransaction } = useSelector(
    (state) => state.transaction
  );

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

  // ✅ Auto clear messages after 3 seconds
  useEffect(() => {
    if (lastTransaction || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastTransaction, error, dispatch]);

  // ✅ Show alert on success/error
  useEffect(() => {
    if (lastTransaction) {
      alert("Deposit Money Successfully....🎉🎉");
      setFormData({ accountNumber: "", amount: "" });
    }
    if (error) {
      alert("Deposit Failed: " + error);
    }
  }, [lastTransaction, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      alert("Token missing! Please login again.");
      return;
    }

    dispatch(
      depositMoney({
        accountNumber: formData.accountNumber,
        amount: Number(formData.amount),
        token,
      })
    );
  };

  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col w-[880px] mx-auto mt-10">
      <h1 className="text-3xl mb-6 text-green-500 text-center font-semibold">
        Fund Deposit
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
          disabled={loading}
        >
          {loading ? "Processing..." : "Deposit"}
        </Button>
      </form>

      {lastTransaction && (
        <p className="text-green-400 mt-4 text-center">
          ✅ Deposit Successful..!🎉🎉 Transaction Amount: {lastTransaction.amount}
        </p>
      )}

      {error && <p className="text-red-400 mt-4 text-center">❌ {error}</p>}
    </div>
  );
};

export default Deposits;