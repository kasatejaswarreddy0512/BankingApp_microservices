import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useLocation } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accountId = queryParams.get("accountId"); // Get accountId from query params

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `/api/transactions?accountId=${accountId}`
        ); // Replace with your backend endpoint
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (accountId) {
      fetchTransactions();
    }
  }, [accountId]);

  return (
    <div className="card relative p-6 border rounded-lg shadow-md flex flex-col w-[800px] mx-auto mt-10">
      <Typography variant="h4" className="text-green-500 text-center mb-6">
        Transaction History
      </Typography>

      {transactions.length > 0 ? (
        <TableContainer component={Paper} sx={{ backgroundColor: "#111" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Amount</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Transaction Date</TableCell>
                <TableCell sx={{ color: "white" }}>Transaction Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell sx={{ color: "white" }}>{tx.amount}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {tx.description}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {new Date(tx.transactionDate).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {tx.transactionType}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{ color: "white", textAlign: "center", mt: 4 }}>
          No transactions found for this account.
        </Typography>
      )}
    </div>
  );
};

export default Transactions;
