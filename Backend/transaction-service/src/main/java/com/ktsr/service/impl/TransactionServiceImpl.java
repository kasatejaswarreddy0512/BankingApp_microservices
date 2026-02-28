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

        //sender Transaction
        Transaction sendTransaction = new Transaction();
        sendTransaction.setAccountNumber(fromAccountNumber);
        sendTransaction.setAmount(amount);
        sendTransaction.setTransactionType("TRANSFER");
        sendTransaction.setDescription("Transferred $ " + amount + " to account " + toAccountNumber);
        sendTransaction.setTransactionDate(LocalDateTime.now());


        // ✅ Receiver transaction (credit)
        Transaction recevierTransaction = new Transaction();
        recevierTransaction.setAccountNumber(toAccountNumber);
        recevierTransaction.setAmount(amount);
        recevierTransaction.setTransactionType("RECEIVED");
        recevierTransaction.setDescription("Received  $ " + amount + " to account " + fromAccountNumber);
        recevierTransaction.setTransactionDate(LocalDateTime.now());

        transactionRepository.save(recevierTransaction);
        return transactionRepository.save(sendTransaction);
    }

    @Override
    @Transactional
    public Transaction upiTransfer(String fromUpi, String toUpi, double amount, String jwt) {
        if (amount <= 0) throw new IllegalArgumentException("Upi amount must be greater than zero");

        AccountDto fromAccount = accountServiceClient.getAccountByUpi(fromUpi, jwt).getBody();
        if (fromAccount == null) throw new RuntimeException("Account not found with UPI: " + fromUpi);

        AccountDto toAccount = accountServiceClient.getAccountByUpi(toUpi, jwt).getBody();
        if (toAccount == null) throw new RuntimeException("Account not found with UPI: " + toUpi);

        if (fromAccount.getBalance() < amount) throw new RuntimeException("Insufficient balance for UPI");

        // ✅ update balances using accountNumber (not upi)
        accountServiceClient.updateAccountBalance(fromAccount.getAccountNumber(), -amount, jwt);
        accountServiceClient.updateAccountBalance(toAccount.getAccountNumber(), amount, jwt);

        LocalDateTime now = LocalDateTime.now();

        // ✅ Sender transaction
        Transaction senderTx = new Transaction();
        senderTx.setAccountNumber(fromAccount.getAccountNumber());
        senderTx.setAmount(amount);
        senderTx.setTransactionType("TRANSFER");
        senderTx.setDescription("UPI Transfer $" + amount + " to " + toUpi);
        senderTx.setTransactionDate(now);

        // ✅ Receiver transaction
        Transaction receiverTx = new Transaction();
        receiverTx.setAccountNumber(toAccount.getAccountNumber());
        receiverTx.setAmount(amount);
        receiverTx.setTransactionType("RECEIVED");
        receiverTx.setDescription("UPI Received $" + amount + " from " + fromUpi);
        receiverTx.setTransactionDate(now);

        transactionRepository.save(receiverTx);
        return transactionRepository.save(senderTx);
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
