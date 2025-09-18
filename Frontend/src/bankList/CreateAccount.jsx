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

  // ✅ Updated handleChange to use "name" instead of "id"
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createAccount({
        userId: formData.userId,
        accountData: formData,
        token: localStorage.getItem("token"),
      })
    );
    console.log("Account Data Submitted:", formData);
  };

  const textFieldStyles = {
    marginBottom: "30px",
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiInputLabel-root": { color: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
  };

  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col w-[800px] mx-auto mt-10">
      <h1 className="text-2xl mb-6 text-green-500 text-center font-semibold ">
        Create Account
      </h1>

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
          <InputLabel id="accountType-label" sx={{ color: "white" }}>
            Select Account Type
          </InputLabel>
          <Select
            labelId="accountType-label"
            name="accountType" // ✅ changed
            value={formData.accountType}
            onChange={handleChange}
            sx={{ color: "white" }}
          >
            <MenuItem value="Savings">Savings</MenuItem>
            <MenuItem value="Current">Current</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
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
          type="text"
          fullWidth
          label="Enter Upi"
          value={formData.upi}
          onChange={handleChange}
          variant="outlined"
          sx={textFieldStyles}
        />

        <TextField
          name="bankName"
          type="text"
          fullWidth
          label="Enter Bank Name"
          value={formData.bankName}
          onChange={handleChange}
          variant="outlined"
          sx={textFieldStyles}
        />

        {/* Dynamic User Dropdown */}
        <FormControl fullWidth sx={textFieldStyles}>
          <InputLabel id="userId-label" sx={{ color: "white" }}>
            Select User
          </InputLabel>
          <Select
            labelId="userId-label"
            name="userId" // ✅ changed
            value={formData.userId}
            onChange={handleChange}
            sx={{ color: "white" }}
          >
            {loading && <MenuItem disabled>Loading...</MenuItem>}
            {error && <MenuItem disabled>Error loading users</MenuItem>}
            {users?.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default CreateAccount;
