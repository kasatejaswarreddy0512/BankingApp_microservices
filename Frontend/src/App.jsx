import "./App.css";
import NavBar from "./pages/NavBar";
import SideBar from "./pages/SideBar";
import AllRoutes from "./bankList/AllRoutes";

function App() {
  return (
    <>
      <NavBar />
      <div className="flex h-screen px-5 lg:px-10 gap-6">
        {/* Sidebar always visible */}
        <div className="w-[20vw] sticky top-0 h-screen">
          <SideBar />
        </div>

        {/* Routes load on right side */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <AllRoutes />
        </div>
      </div>
    </>
  );
}

export default App;
