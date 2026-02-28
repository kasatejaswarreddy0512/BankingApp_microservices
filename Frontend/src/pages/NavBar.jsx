import { Avatar, backdropClasses } from "@mui/material";
import React from "react";
import "./NavBar.css";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { account, auth } = useSelector((store) => store);

  return (
    <div className="container z-10 sticky top-0 right-0 left-0 py-2 px-2 flex justify-between items-center shadow-md text-4xl bg-white">
      <div className="flex items-center gap-3 text-3xl">
        <Avatar src="https://mir-s3-cdn-cf.behance.net/projects/404/fc98b2114518789.Y3JvcCwxOTE3LDE1MDAsNDIsMA.jpg" sx={{ backgroundColor: "lightgray" }}></Avatar>
        <p>Pocket Bank</p>
      </div>

      <div className="flex items-center gap-3 text-2xl">
        <p className="mt-5 p-9">{auth?.user?.fullName}</p>
        <Avatar src={auth?.user?.profilePictureUrl} sx={{ backgroundColor: "lightgray" }}></Avatar>
      </div>
    </div>
  );
};

export default NavBar;
