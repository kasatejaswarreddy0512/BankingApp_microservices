import {
  TextField,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../Redux-Toolkit/AuthSlice";
import { useNavigate } from "react-router-dom";

const Signup = ({ togglePannel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

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
    role: "USER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    try {
      await dispatch(register(formData)); // no unwrap needed

      // ✅ Clear form
      setFormData({
        aadhaarNumber: "",
        address: "",
        dateOfBirth: "",
        email: "",
        fullName: "",
        panNumber: "",
        password: "",
        phoneNumber: "",
        profilePictureUrl: "",
        role: "USER",
      });

      // ✅ Show snackbar
      setOpen(true);

      // ✅ Navigate after 3 seconds
      setTimeout(() => {
        setOpen(false);
        navigate("/Signin");
      }, 3000);

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div
        className="flex flex-col items-center rounded-lg shadow-lg p-6"
        style={{ width: "550px", marginTop: "2px" }}
      >
        <h1
          className="text-2xl text-center pb-4 text-white"
          style={{ marginBottom: "20px" }}
        >
          Register
        </h1>

        <form
          className="grid grid-cols-3 gap-4 w-full"
          onSubmit={handleSubmit}
        >
          <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required sx={textFieldStyles} />
          <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required sx={textFieldStyles} />
          <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required sx={textFieldStyles} />

          <TextField label="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // remove non-digits
            if (value.length <= 12) {
              setFormData({ ...formData, aadhaarNumber: value });
            }
          }}
            required
            inputProps={{
              maxLength: 12,
              inputMode: "numeric",
              pattern: "[0-9]{12}",
            }}
            sx={textFieldStyles} />
          <TextField
            label="PAN Number"
            name="panNumber"
            value={formData.panNumber}
            onChange={(e) => {
              let value = e.target.value
                .toUpperCase()          // convert to uppercase
                .replace(/[^A-Z0-9]/g, ""); // remove special characters

              if (value.length <= 10) {
                setFormData({ ...formData, panNumber: value });
              }
            }}
            required
            inputProps={{
              maxLength: 10,
              pattern: "[A-Z0-9]{10}",
            }}
            sx={{
              ...textFieldStyles,
              "& input": { textTransform: "uppercase" },
            }}
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // remove non-digits
              if (value.length <= 10) {
                setFormData({ ...formData, phoneNumber: value });
              }
            }}
            required
            inputProps={{
              maxLength: 10,
              inputMode: "numeric",
              pattern: "[0-9]{10}",
            }}
            sx={textFieldStyles}
          />

          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            sx={{
              ...textFieldStyles,
              "& input::-webkit-calendar-picker-indicator": {
                filter: "invert(1)",
              },
            }}
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            sx={{ ...textFieldStyles, gridColumn: "span 2" }}
          />

          <TextField
            label="Profile Picture URL"
            name="profilePictureUrl"
            value={formData.profilePictureUrl}
            onChange={handleChange}
            required
            sx={{ ...textFieldStyles, gridColumn: "span 3" }}
          />

          <FormControl sx={{ ...textFieldStyles, gridColumn: "span 3" }}>
            <InputLabel sx={{ color: "white" }}>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={handleRoleChange}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: { backgroundColor: "black", color: "white" },
                },
              }}
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="USER">USER</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            sx={{
              height: "50px",
              gridColumn: "span 3",
              borderRadius: "8px",
            }}
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

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          User registered successfully 🎉
        </Alert>
      </Snackbar>
    </div>
  );
};

const textFieldStyles = {
  width: "100%",
  "& .MuiInputBase-root": { height: "56px" },
  "& .MuiInputBase-input": { color: "white" },
  "& .MuiInputLabel-root": { color: "white" },
  "& .MuiOutlinedInput-root fieldset": { borderColor: "white" },
  "&:hover .MuiOutlinedInput-root fieldset": { borderColor: "white" },
  "&.Mui-focused .MuiOutlinedInput-root fieldset": {
    borderColor: "white",
  },
};

export default Signup;