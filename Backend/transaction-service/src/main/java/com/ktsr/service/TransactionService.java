package com.ktsr.service;

import com.ktsr.entity.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction deposit(String accountNumber, double amount, String jwt);

    Transaction withdraw(String accountNumber, double amount, String jwt);

    Transaction transfer(String fromAccountNumber, String toAccountNumber, double amount, String jwt);

    List<Transaction> getTransactionByAccountId(String accountNumber, String jwt);
}
