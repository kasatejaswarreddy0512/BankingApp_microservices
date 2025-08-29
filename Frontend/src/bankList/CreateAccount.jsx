import {
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountType: "",
    ifscCode: "",
    branchName: "",
    balance: "",
    userId: "",
  });

  const [accountTypeValue, setAccountTypeValue] = useState("");

  // Example users array
  const users = [
    { id: "1", fullName: "Tejaswar Reddy" },
    { id: "2", fullName: "Ananya Sharma" },
    { id: "3", fullName: "Ravi Kumar" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAccountTypeChange = (e) => {
    setAccountTypeValue(e.target.value);
    setFormData({
      ...formData,
      accountType: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Account Data Submitted:", formData);
    // Call backend API here, e.g., axios.post("/createAccount", formData)
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
          id="accountNumber"
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
            id="accountType"
            value={accountTypeValue}
            onChange={handleAccountTypeChange}
            sx={{ color: "white" }}
          >
            <MenuItem value="Savings">Savings</MenuItem>
            <MenuItem value="Current">Current</MenuItem>
            <MenuItem value="Fixed Deposit">Fixed Deposit</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="ifscCode"
          fullWidth
          label="Enter IFSC Code"
          value={formData.ifscCode}
          onChange={handleChange}
          variant="outlined"
          sx={textFieldStyles}
        />

        <TextField
          id="branchName"
          fullWidth
          label="Enter Branch Name"
          value={formData.branchName}
          onChange={handleChange}
          variant="outlined"
          sx={textFieldStyles}
        />

        <TextField
          id="balance"
          type="number"
          fullWidth
          label="Enter Balance"
          value={formData.balance}
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
            id="userId"
            value={formData.userId}
            onChange={handleChange} // Updates formData.userId
            sx={{ color: "white" }}
          >
            {users.map((user) => (
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
