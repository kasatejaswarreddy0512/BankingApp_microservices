import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAccountsByUserId } from "../Redux-Toolkit/AccountSlice";
import { fetchTransactions } from "../Redux-Toolkit/TransactionSlice";

const Transactions = () => {
  const dispatch = useDispatch();

  const token =
    useSelector(
      (state) => state.auth?.token || state.auth?.jwt || state.auth?.accessToken
    ) ||
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken");

  const userId =
    useSelector((state) => state.auth?.user?.id || state.auth?.userId) ||
    localStorage.getItem("userId");

  const accounts = useSelector((state) => state.account?.accounts || []);

  const { transactions = [], loading, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    if (!token) {
      alert("Token missing! Please login again.");
      return;
    }
    if (!userId) {
      alert("UserId missing! Please login again.");
      return;
    }
    dispatch(getAccountsByUserId({ userId, token }));
  }, [dispatch, userId, token]);

  useEffect(() => {
    if (!token) return;
    if (!accounts || accounts.length === 0) return;

    const accountNumber = accounts[0]?.accountNumber;
    if (!accountNumber) return;

    dispatch(fetchTransactions({ accountNumber, token }));
  }, [dispatch, accounts, token]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const isCredit = (type) =>
    ["DEPOSIT", "RECEIVED"].includes(String(type || "").toUpperCase());
  const isDebit = (type) =>
    ["WITHDRAWAL", "TRANSFER"].includes(String(type || "").toUpperCase());

  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col w-[880px] mx-auto mt-10">
      <Typography variant="h4" className="text-green-500 text-center mb-6">
        Transaction History
      </Typography>

      {loading ? (
        <Typography sx={{ color: "white", textAlign: "center", mt: 4 }}>
          Loading transactions...
        </Typography>
      ) : error ? (
        <Typography sx={{ color: "red", textAlign: "center", mt: 4 }}>
          ❌ {error}
        </Typography>
      ) : transactions.length > 0 ? (
        // ✅ make ONLY this area scroll
        <div >
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "#111", maxHeight: "70vh", overflowY: "auto" }}
          >
            <Table stickyHeader>
              <TableHead >
                <TableRow>
                  {/* <TableCell sx={{ color: "white", fontSize: 20, backgroundColor: "#2f9f06" }}>
                    S.No
                  </TableCell> */}
                  <TableCell sx={{ color: "white", fontSize: 20, backgroundColor: "#2f9f06" }}>
                    Amount
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: 20, backgroundColor: "#2f9f06" }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: 20, backgroundColor: "#2f9f06" }}>
                    Transaction Date
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: 20, backgroundColor: "#2f9f06" }}>
                    Transaction Type
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {transactions.map((tx, index) => {
                  const type = String(tx.transactionType || "").toUpperCase();
                  const credit = isCredit(type);
                  const debit = isDebit(type);

                  const amountColor = credit
                    ? "#22c55e"
                    : debit
                      ? "#ef4444"
                      : "white";

                  const sign = credit ? "+" : debit ? "-" : "";
                  const amountText = `${sign}${tx.amount}`;

                  return (
                    <TableRow key={tx.id}>
                      {/* <TableCell sx={{ color: "white", fontWeight: 700 }}>
                        {index + 1}
                      </TableCell> */}
                      <TableCell sx={{ color: amountColor, fontWeight: 700 }}>
                        {amountText}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>{tx.description}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {tx.transactionDate
                          ? new Date(tx.transactionDate).toLocaleString()
                          : "-"}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: debit ? "#ef4444" : credit ? "#22c55e" : "white",
                        }}
                      >
                        {type}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Typography sx={{ color: "white", textAlign: "center", mt: 4 }}>
          No transactions found for this account.
        </Typography>
      )}
    </div>
  );
};

export default Transactions;