import {
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuserProfileList } from "../Redux-Toolkit/AuthSlice";
import { createAccount } from "../Redux-Toolkit/AccountSlice";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((store) => store.auth);

  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    accountNumber: "",
    accountType: "",
    ifscCode: "",
    branchName: "",
    balance: "",
    upi: "",
    bankName: "",
    userId: "",
  });

  // Fetch users on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getuserProfileList(token));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        createAccount({
          userId: formData.userId,
          accountData: formData,
          token: localStorage.getItem("token"),
        })
      ).unwrap();

      // ✅ Show success message
      setSuccessMsg("Account created successfully ✅");

      // ✅ Clear form
      setFormData({
        accountNumber: "",
        accountType: "",
        ifscCode: "",
        branchName: "",
        balance: "",
        upi: "",
        bankName: "",
        userId: "",
      });

      // ✅ Hide after 3 seconds
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);

    } catch (err) {
      console.error("Error creating account:", err);
    }
  };

  const textFieldStyles = {
    marginBottom: "10px",
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiInputLabel-root": { color: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
  };

  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col w-[880px] mx-auto mt-10">
      <h1 className="text-2xl mb-6 text-green-500 text-center font-semibold">
        Create Account
      </h1>

      {/* ✅ Success Message */}
      {successMsg && (
        <div
          style={{
            background: "#16a34a",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <TextField
          name="accountNumber"
          fullWidth
          label="Enter Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          variant="outlined"
          sx={textFieldStyles}
        />

        <FormControl fullWidth sx={textFieldStyles}>
          <InputLabel id="accountType-label">Select Account Type</InputLabel>
          <Select
            labelId="accountType-label"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            sx={{
              color: "white",
              "& .MuiSelect-icon": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "black",
                  color: "white",
                },
              },
            }}
          >
            {["Savings", "Current", "Business"].map((type) => (
              <MenuItem
                key={type}
                value={type}
                sx={{
                  color: "white",
                  "&:hover": { backgroundColor: "#222" },
                }}
              >
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="ifscCode"
          fullWidth
          label="Enter IFSC Code"
          value={formData.ifscCode}
          onChange={handleChange}
          variant="outlined"
          sx={textFieldStyles}
        />

        <TextField
          name="branchName"
          fullWidth
          label="Enter Branch Name"
          value={formData.branchName}
          onChange={handleChange}
          variant="outlined"
          sx={textFieldStyles}
        />

        <TextField
          name="balance"
          type="number"
          fullWidth
          label="Enter Balance"
          value={formData.balance}
          onChange={handleChange}
          variant="outlined"
          sx={textFieldStyles}
        />

        <TextField
          name="upi"
          fullWidth
          label="Enter UPI"
          value={formData.upi}
          onChange={handleChange}
          variant="outlined"
          sx={textFieldStyles}
        />

        <TextField
          name="bankName"
          fullWidth
          label="Enter Bank Name"
          value={formData.bankName}
          onChange={handleChange}
          variant="outlined"
          sx={textFieldStyles}
        />

        {/* User Dropdown */}
        <FormControl fullWidth sx={textFieldStyles}>
          <InputLabel id="userId-label">Select User</InputLabel>
          <Select
            labelId="userId-label"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            sx={{
              color: "white",
              "& .MuiSelect-icon": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "black",
                  color: "white",
                },
              },
            }}
          >
            {loading && <MenuItem disabled>Loading...</MenuItem>}
            {error && <MenuItem disabled>Error loading users</MenuItem>}
            {users?.map((user) => (
              <MenuItem
                key={user.id}
                value={user.id}
                sx={{
                  color: "white",
                  "&:hover": { backgroundColor: "#222" },
                }}
              >
                {user.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: "10px", borderRadius: "8px", width: "200px", marginLeft: "350px", }}
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default CreateAccount;