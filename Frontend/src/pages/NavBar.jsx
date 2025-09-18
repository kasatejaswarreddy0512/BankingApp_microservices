import { Avatar, backdropClasses } from "@mui/material";
import React from "react";
import "./NavBar.css";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { account, auth } = useSelector((store) => store);

  return (
    <div className="container z-10 sticky top-0 right-0 left-0 py-3 px-5 flex justify-between items-center shadow-md text-3xl bg-white">
      <p>PocketBank</p>

      <div className="flex item-center gap-5 text-xl">
        <p className="mt-9">{auth.user.fullName}</p>
        <Avatar
          src={auth.user.profilePictureUrl}
          sx={{ backgroundColor: "lightgray" }}
        ></Avatar>
      </div>
    </div>
  );
};

export default NavBar;
