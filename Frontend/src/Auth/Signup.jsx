import {
  TextField,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";

const Signup = ({ togglePannel }) => {
  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    address: "",
    dateOfBirth: "",
    email: "",
    fullName: "",
    panNumber: "",
    password: "",
    phoneNumber: "",
    profilePictureUrl: "",
    role: "USER", // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role) {
      alert("Please select a role");
      return;
    }
    console.log("Signup form:", formData);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div
        className="flex flex-col items-center rounded-lg shadow-lg"
        style={{ width: "500px", marginTop: "15px" }}
      >
        <h1 className="text-2xl text-center space-y-2 pb-1 text-white">
          Register
        </h1>

        <form className="grid grid-cols-3 gap-1 w-full" onSubmit={handleSubmit}>
          {/* Full Name */}
          <TextField
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your Full Name..."
            required
            sx={textFieldStyles}
          />

          {/* Email */}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email..."
            required
            sx={textFieldStyles}
          />

          {/* Password */}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password..."
            required
            sx={textFieldStyles}
          />

          {/* Aadhaar Number */}
          <TextField
            label="Aadhaar Number"
            name="aadhaarNumber"
            type="text"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            placeholder="Enter Aadhaar Number..."
            required
            sx={textFieldStyles}
          />

          {/* PAN Number */}
          <TextField
            label="PAN Number"
            name="panNumber"
            type="text"
            value={formData.panNumber}
            onChange={handleChange}
            placeholder="Enter PAN Number..."
            required
            sx={textFieldStyles}
          />

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="text"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter Phone Number..."
            required
            sx={textFieldStyles}
          />

          {/* Date of Birth */}
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            sx={textFieldStyles}
          />

          {/* Address (make it span 2 cols) */}
          <TextField
            label="Address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your Address..."
            required
            sx={{ ...textFieldStyles, gridColumn: "span 2" }}
          />

          {/* Profile Picture URL */}
          <TextField
            label="Profile Picture URL"
            name="profilePictureUrl"
            type="text"
            value={formData.profilePictureUrl}
            onChange={handleChange}
            placeholder="Enter profile image URL..."
            required
            sx={{ ...textFieldStyles, gridColumn: "span 3" }}
          />

          {/* Role Selection */}
          <FormControl sx={{ ...textFieldStyles, gridColumn: "span 3" }}>
            <InputLabel sx={{ color: "white" }}>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={handleRoleChange}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
              <MenuItem value={"USER"}>USER</MenuItem>
            </Select>
          </FormControl>

          {/* Register Button (full width) */}
          <Button
            sx={{
              height: "50px",
              width: "100%",
              marginLeft: "80px",
              backgroundColor: "#1976d2",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#1565c0" },
              gridColumn: "span 2",
            }}
            type="submit"
          >
            Register
          </Button>
        </form>

        <div className="pt-4 text-white">
          <span>Already have an account? </span>
          <Button
            onClick={togglePannel}
            sx={{ textTransform: "none", color: "#1976d2" }}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ✅ Shared input styles */
const textFieldStyles = {
  mb: 2,
  width: "100%",
  "& .MuiInputBase-input": { color: "white" },
  "& .MuiInputLabel-root": { color: "white" },
  "& .MuiOutlinedInput-root fieldset": { borderColor: "white" },
  "&:hover .MuiOutlinedInput-root fieldset": { borderColor: "white" },
  "&.Mui-focused .MuiOutlinedInput-root fieldset": { borderColor: "white" },
};

export default Signup;
