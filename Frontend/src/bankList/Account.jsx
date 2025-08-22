import React from "react";
import "../App.css";

const Account = () => {
  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-row  justify-between">
      {/* Left Side - Account Details */}
      <div className="w-1/2 pr-6 mt-4 details">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          Account Details
        </h2>
        <div className="space-y-3">
          <p className="text-sm">
            <span className="font-medium">Account Name:</span> John Doe
          </p>
          <p className="text-sm">
            <span className="font-medium">Account Number:</span> 123456789
          </p>
          <p className="text-sm">
            <span className="font-medium">Account Type:</span> Savings
          </p>
          <p className="text-sm">
            <span className="font-medium">IFSC Code:</span> ABCD0123456
          </p>
          <p className="text-sm">
            <span className="font-medium">Branch:</span> Hyderabad Main
          </p>
          <p className="text-sm">
            <span className="font-medium">Balance:</span> ₹10,000
          </p>
        </div>

        {/* User Details */}
        <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-4">
          User Details
        </h2>
        <div className="space-y-3">
          <p className="text-sm">
            <span className="font-medium">Name:</span> John Doe
          </p>
          <p className="text-sm">
            <span className="font-medium">Email:</span> john.doe@email.com
          </p>
          <p className="text-sm">
            <span className="font-medium">Phone:</span> +91 9876543210
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 flex justify-center ml-100 img">
        <img
          src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=1170&auto=format&fit=crop"
          alt="Bank Account"
          className="w-100 h-100 object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Account;
