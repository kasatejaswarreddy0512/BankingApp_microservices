import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Account from "./Account";
import ToAccount from "./ToAccount";
import ToUpi from "./ToUpi";
import Deposits from "./Deposits";
import Withdrawals from "./Withdrawals";
import CreateAccount from "./CreateAccount";
import Transactions from "./Transactions";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/account" replace />} />
      <Route path="/account" element={<Account />} />
      <Route path="/toaccount" element={<ToAccount />} />
      <Route path="/toupi" element={<ToUpi />} />
      <Route path="/deposits" element={<Deposits />} />
      <Route path="/withdrawals" element={<Withdrawals />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/transactions" element={<Transactions />} />
      {/* <Route path="/notifications" element={<Notifications />} /> */}
    </Routes>
  );
};

export default AllRoutes;
