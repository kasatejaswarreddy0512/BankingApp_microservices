import React from 'react'
import SideBar from "../pages/SideBar";
import AllRoutes from "../bankList/AllRoutes";

const Home = () => {
  return (
    <div>
       <div className="flex h-screen px-5 lg:px-10 gap-6">
            <div className="w-[20vw] sticky top-0 h-screen">
              <SideBar />
            </div>
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <AllRoutes />
            </div>
          </div>
    </div>
  )
}

export default Home
