package com.ktsr.service;

import com.ktsr.enity.Account;

import java.sql.SQLException;
import java.util.List;

public interface AccountService {


    Account createAccount(Long userId,Account account,String requestRole) throws Exception;
    List<Account> getAllAccounts();

    Account getAccountById(Long accountId);
    Account updateAccount(Long accountId, Account account,String requestRole);
    Account deleteAccount(Long accountId, String requestRole);
    List<Account> getAccountByUserId(Long userId);
    Account getAccountByAccountNumber(String accountNumber);

    Account  updateAccountBalance(String accountNumber, Double amount);
}
