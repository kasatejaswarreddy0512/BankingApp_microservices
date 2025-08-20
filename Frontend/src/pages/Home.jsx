import React from "react";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div className="flex h-screen px-5 lg:px-10 pt:[2.9vh] gap-6">
      <div className="w-[200vw] sticky top-0 h-screen ">
        <SideBar />
      </div>

      <div className="flex-1  overflow-y-auto hide-scrollbar">
        <p className="text-white"> TaskList</p>
      </div>
    </div>
  );
};

export default Home;
