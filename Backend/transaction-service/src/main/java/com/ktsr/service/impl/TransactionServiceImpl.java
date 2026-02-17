package com.ktsr.service.impl;

import com.ktsr.dto.AccountDto;
import com.ktsr.entity.Transaction;
import com.ktsr.feign.AccountServiceClient;
import com.ktsr.repository.TransactionRepository;
import com.ktsr.service.TransactionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountServiceClient accountServiceClient;

    @Override
    @Transactional
    public Transaction deposit(String  accountNumber, double amount, String jwt) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be greater than zero");
        }

        AccountDto accountDto = accountServiceClient.getAccountByAccountNumber(accountNumber, jwt).getBody();
        if (accountDto == null) {
            throw new RuntimeException("Account not found with id: " + accountNumber);
        }

        accountServiceClient.updateAccountBalance(accountNumber, amount, jwt); // Pass delta

        Transaction transaction = new Transaction();
        transaction.setAccountNumber(accountNumber);
        transaction.setAmount(amount);
        transaction.setTransactionType("DEPOSIT");
        transaction.setDescription("Deposit of $ " + amount);
        transaction.setTransactionDate(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

    @Override
    @Transactional
    public Transaction withdraw(String accountNumber, double amount, String jwt) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be greater than zero");
        }

        AccountDto accountDto = accountServiceClient.getAccountByAccountNumber(accountNumber, jwt).getBody();
        if (accountDto == null) {
            throw new RuntimeException("Account not found with id: " + accountNumber);
        }
        if (accountDto.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance for withdrawal");
        }

        accountServiceClient.updateAccountBalance(accountNumber, -amount, jwt); // Pass negative amount

        Transaction transaction = new Transaction();
        transaction.setAccountNumber(accountNumber);
        transaction.setAmount(amount);
        transaction.setTransactionType("WITHDRAWAL");
        transaction.setDescription("Withdrawal of $ " + amount);
        transaction.setTransactionDate(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

    @Override
    @Transactional
    public Transaction transfer(String fromAccountNumber, String toAccountNumber, double amount, String jwt) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Transfer amount must be greater than zero");
        }

        AccountDto fromAccount = accountServiceClient.getAccountByAccountNumber(fromAccountNumber, jwt).getBody();
        if (fromAccount == null) {
            throw new RuntimeException("From Account not found with id: " + fromAccountNumber);
        }

        AccountDto toAccount = accountServiceClient.getAccountByAccountNumber(toAccountNumber, jwt).getBody();
        if (toAccount == null) {
            throw new RuntimeException("To Account not found with id: " + toAccountNumber);
        }

        if (fromAccount.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance for transfer");
        }

        accountServiceClient.updateAccountBalance(fromAccountNumber, -amount, jwt); // debit
        accountServiceClient.updateAccountBalance(toAccountNumber, amount, jwt);   // credit

        Transaction transaction = new Transaction();
        transaction.setAccountNumber(fromAccountNumber);
        transaction.setAmount(amount);
        transaction.setTransactionType("TRANSFER");
        transaction.setDescription("Transfer of $ " + amount + " to account " + toAccountNumber);
        transaction.setTransactionDate(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionByAccountId(String accountNumber, String jwt) {
     AccountDto accountDto= accountServiceClient.getAccountByAccountNumber(accountNumber,jwt).getBody();
     if(accountDto==null){
         throw new RuntimeException("Account Number Not Found...!");
     }
     return transactionRepository.findByAccountNumber(accountNumber);
    }


}
