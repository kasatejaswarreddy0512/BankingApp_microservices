import { Avatar, Button } from "@mui/material";
import React from "react";
import "./SideBar.css"; // Assuming you have a CSS file for styling

const SideBar = () => {
  const menu = [
    { name: "HOME", value: "home", role: ["ADMIN", "USER"] },
    { name: "TO ACCOUNT", value: "ToAccount", role: ["USER"] }, // transfer via account number
    { name: "TO UPI", value: "ToUpi", role: ["USER"] },
    { name: "DEPOSITS", value: "Deposits", role: ["ADMIN", "USER"] },
    { name: "WITHDRAWALS", value: "Withdrawals", role: ["ADMIN", "USER"] },
    { name: "CREATE ACCOUNT", value: "CreateAccount", role: ["ADMIN"] }, // only admin
    { name: "TRANSACTIONS", value: "Transactions", role: ["ADMIN", "USER"] },
    { name: "NOTIFICATIONS", value: "Notifications", role: ["USER"] },
  ];

  //Logout
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="card min-h-[85vh] w-[20vw] ml-5 flex flex-col justify-center items-center">
      <Avatar
        src="https://4.bp.blogspot.com/-LLst6-jf4FA/VeRJjUNrFsI/AAAAAAAADIQ/W9FCba0BQZA/s1600/prabhas1.jpg"
        sx={{
          width: "8rem",
          height: "8rem",
          marginBottom: "10px",
        }}
        className="border-2 border-gray-800 mb-2"
      />
      <div className="flex flex-col w-full space-y-2 px-2">
        {menu.map((item) => (
          <div
            key={item.value}
            className="text-sm text-center mt-2 border  py-2 rounded-full cursor-pointer "
          >
            {item.name}
          </div>
        ))}
      </div>

      <Button
        onClick={handleLogout}
        sx={{ padding: "6px", borderRadius: "60px", marginTop: "6px" }}
        className="logout"
      >
        Log Out
      </Button>
    </div>
  );
};

export default SideBar;
