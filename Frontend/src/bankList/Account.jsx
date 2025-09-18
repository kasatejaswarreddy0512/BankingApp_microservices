import React, { useEffect } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { getAccountsByUserId } from "../Redux-Toolkit/AccountSlice";

const Account = () => {
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector((store) => store.account);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user?.id) {
      const token = localStorage.getItem("token");
      dispatch(getAccountsByUserId({ userId: user.id, token }));
    }
  }, [dispatch, user]);

  if (loading) return <p>Loading account details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // If multiple accounts exist, take the first one (or map through them)
  const account = accounts?.[0];

  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-row justify-between">
      {/* Left Side - Account Details */}
      <div className="w-1/2 pr-6 space-y-3 mt-9 details">
        <h2 className="text-3xl font-semibold text-green-500 account-head">
          Account Details
        </h2>
        {account ? (
          <div className="space-y-3">
            <p className="account text-sm">
              <span className="font-medium">Account Name:</span>{" "}
              {user?.fullName || "N/A"}
            </p>
            <p className="account text-sm">
              <span className="font-medium">Account Number:</span>{" "}
              {account.accountNumber}
            </p>
            <p className="account text-sm">
              <span className="font-medium">Account Type:</span>{" "}
              {account.accountType}
            </p>
            <p className="account text-sm">
              <span className="font-medium">IFSC Code:</span> {account.ifscCode}
            </p>
            <p className="account text-sm">
              <span className="font-medium">Branch:</span>{" "}
              {account.branchName || "N/A"}
            </p>
            <p className="account text-sm">
              <span className="font-medium ">Balance:</span> ₹{account.balance}
            </p>
          </div>
        ) : (
          <p>No account details available.</p>
        )}

        {/* User Details */}
        <h2 className="text-3xl font-semibold text-blue-800 account-head mt-9 mb-4">
          User Details
        </h2>
        <div className="space-y-3">
          <p className="account text-sm">
            <span className="font-medium">Name:</span> {user?.fullName}
          </p>
          <p className="account text-sm">
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p className="account text-sm">
            <span className="font-medium">Phone:</span> {user?.phoneNumber}
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 flex justify-center img">
        {user?.profilePictureUrl ? (
          <img
            src={user.profilePictureUrl}
            alt="Profile"
            className="img w-100 h-100 object-cover rounded-lg"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
            No Image
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
