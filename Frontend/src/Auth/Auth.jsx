import React, { useState } from "react";
import "./Auth.css";
import Signin from "./Signin";
import Signup from "./Signup";

const Auth = () => {
  const [isRegister, setRegister] = useState(false);

  const togglePanel = () => {
    setRegister(!isRegister);
  };

  return (
    <div className="flex justify-center h-screen items-center overflow-hidden w-full">
      <div className="box lg:max-w-6xl w-full flex shadow-2xl">
        {/* Left side → Signin with image */}
        <div className="w-1/2 hidden md:flex flex-col">
          {/* Image */}
          <img
            src="https://images.freecreatives.com/wp-content/uploads/2015/03/Huge-Backgrounds-63.jpg"
            alt="Signin Background"
            className="h-2/3 w-full object-cover"
          />

          {/* Text */}
          <div className="flex flex-col justify-center items-center text-white bg-black bg-opacity-70 p-6 h-1/3 text-center">
            <span className="text-2xl font-semibold">
              Great goals are reached through disciplined execution.
            </span>
            <span className="text-sm mt-2">
              Let’s connect and create impact.
            </span>
          </div>
        </div>

        {/* Right side → Either Signin OR Signup */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-[#0a0a0a]">
          {!isRegister ? (
            <Signin togglePannel={togglePanel} />
          ) : (
            <Signup togglePannel={togglePanel} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
