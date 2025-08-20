import { Avatar, backdropClasses } from "@mui/material";
import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="container z-10 sticky top-0 right-0 left-0 py-3 px-5 flex justify-between items-center shadow-md text-3xl bg-white">
      <p>PocketBank</p>

      <div className="flex item-center gap-5 text-xl">
        <p className="mt-2">Kasa Tejaswar Reddy</p>
        <Avatar
          src="https://4.bp.blogspot.com/-LLst6-jf4FA/VeRJjUNrFsI/AAAAAAAADIQ/W9FCba0BQZA/s1600/prabhas1.jpg"
          sx={{ backgroundColor: "lightgray" }}
        ></Avatar>
      </div>
    </div>
  );
};

export default NavBar;
