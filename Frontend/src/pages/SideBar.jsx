import { Avatar, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import { logout } from "../Redux-Toolkit/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const menu = [
    { name: "ACCOUNT", value: "Account", role: ["ADMIN", "USER"] },
    { name: "TO ACCOUNT", value: "ToAccount", role: ["USER"] },
    { name: "TO UPI", value: "ToUpi", role: ["USER"] },
    { name: "DEPOSITS", value: "Deposits", role: ["USER"] },
    { name: "WITHDRAWALS", value: "Withdrawals", role: ["USER"] },
    { name: "CREATE ACCOUNT", value: "CreateAccount", role: ["ADMIN"] },
    { name: "TRANSACTIONS", value: "Transactions", role: ["USER"] },
    { name: "NOTIFICATIONS", value: "Notifications", role: ["USER"] },
    { name: "ALL USERS", value: "AllUsers", role: ["ADMIN"] },
  ];

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logged out successfully");
  };

  // 🔥 Filter menu based on role
  const filteredMenu = menu.filter((item) =>
    item.role.includes(auth?.user?.role)
  );

  return (
    <div className="sidebar">
      <div className="sidebarTop">
        <Avatar
          src={auth?.user?.profilePictureUrl}
          className="sidebarAvatar"
        />
      </div>

      <div className="sidebarMenu">
        {filteredMenu.map((item) => (
          <button
            key={item.value}
            className="menuItem"
            onClick={() => navigate(`/${item.value.toLowerCase()}`)}
            type="button"
          >
            {item.name}
          </button>
        ))}
      </div>

      <Button onClick={handleLogout} className="logoutBtn">
        Log Out
      </Button>
    </div>
  );
};

export default SideBar;






// import { Avatar, Button } from "@mui/material";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./SideBar.css";
// import { logout } from "../Redux-Toolkit/AuthSlice";
// import { useDispatch, useSelector } from "react-redux";

// const SideBar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { account, auth } = useSelector((store) => store);

//   const menu = [
//     { name: "ACCOUNT", value: "Account", role: ["ADMIN", "USER"] },
//     { name: "TO ACCOUNT", value: "ToAccount", role: ["USER"] },
//     { name: "TO UPI", value: "ToUpi", role: ["USER"] },
//     { name: "DEPOSITS", value: "Deposits", role: ["ADMIN", "USER"] },
//     { name: "WITHDRAWALS", value: "Withdrawals", role: ["ADMIN", "USER"] },
//     { name: "CREATE ACCOUNT", value: "CreateAccount", role: ["ADMIN"] },
//     { name: "TRANSACTIONS", value: "Transactions", role: ["ADMIN", "USER"] },
//     { name: "NOTIFICATIONS", value: "Notifications", role: ["USER"] },
//   ];

//   const handleLogout = () => {
//     dispatch(logout());
//     console.log("Logged out successfully");
//   };

//   return (
//     // fill parent height
//     <div className="card h-[85vh] w-[20vw] ml-5 flex flex-col">
//       <Avatar
//         src={""}
//         sx={{ width: "8rem", height: "8rem", margin: "10px 0" }}
//         className="border-2 border-gray-800"
//       />

//       {/* scrollable area */}
//       <div className=" flex-2 min-h-3 w-full px-2 space-y-9 text-center overflow-y-auto">
//         {menu.map((item) => (
//           <div
//             key={item.value}
//             onClick={() => navigate(`/${item.value.toLowerCase()}`)}
//             className="menu text-sm text-center border py-3 rounded-full cursor-pointer hover:bg-gray-700 transition "
//           >
//             {item.name}
//           </div>
//         ))}
//       </div>

//       <Button
//         onClick={handleLogout}
//         sx={{ padding: "6px", borderRadius: "60px", margin: "10px 0" }}
//         className="logout"
//       >
//         Log Out
//       </Button>
//     </div>
//   );
// };

// export default SideBar;
