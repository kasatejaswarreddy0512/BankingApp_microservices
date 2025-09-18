import "./App.css";
import NavBar from "./pages/NavBar";
import SideBar from "./pages/SideBar";
import AllRoutes from "./bankList/AllRoutes";
import Auth from "./Auth/Auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountById,
  getAccountsByUserId,
} from "./Redux-Toolkit/AccountSlice";
import { getUserProfile } from "./Redux-Toolkit/AuthSlice";

function App() {
  const dispatch = useDispatch();

  // access auth + account slice
  const { account, auth } = useSelector((store) => store);

  useEffect(() => {
    const token = auth.jwt || localStorage.getItem("token");
    if (token) {
      dispatch(getUserProfile(token));
    }
  }, [auth.jwt]);

  useEffect(() => {
    if (auth.user?._id && auth.token) {
      dispatch(
        getAccountsByUserId({ userId: auth.user._id, token: auth.token })
      );
    }
  }, [auth.user, auth.token]);

  // console.log("User from App.jsx:", auth?.user);
  // console.log("Account from App.jsx:", account);

  const user = auth?.user; // ✅ use store instead of hardcoded false

  return (
    <>
      {user ? (
        <>
          <NavBar />
          <div className="flex h-screen px-5 lg:px-10 gap-6">
            <div className="w-[20vw] sticky top-0 h-screen">
              <SideBar />
            </div>
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <AllRoutes />
            </div>
          </div>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
