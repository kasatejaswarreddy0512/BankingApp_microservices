package com.ktsr.service.impl;

import com.ktsr.dto.UserDto;
import com.ktsr.enity.Account;
import com.ktsr.feign.UserService;
import com.ktsr.repository.AccountRepository;
import com.ktsr.service.AccountService;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
    @RequiredArgsConstructor
    public class AccountServiceImpl  implements AccountService {

        private final AccountRepository accountRepository;
        private final UserService userService;

    @Override
    public Account createAccount(Long userId, Account account, String requestRole) throws Exception {

        if(!requestRole.equalsIgnoreCase("ADMIN")) {
            throw new Exception("Only Admin can Create Account..!");
        }
        account.setUserId(userId);
        return accountRepository.save(account);
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountById(Long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));
    }

    @Override
    public Account updateAccount(Long accountId, Account account, String requestRole) {
        if(!requestRole.equalsIgnoreCase("ADMIN")){
            throw new RuntimeException("Unauthorized to update account");
        }
        Account existingAccount = getAccountById(accountId);
        if(account.getAccountNumber() != null) {
            existingAccount.setAccountNumber(account.getAccountNumber());
        }
        if(account.getIfscCode() != null) {
            existingAccount.setIfscCode(account.getIfscCode());
        }
        if (account.getUpi() != null) {
            existingAccount.setUpi(account.getUpi());
        }
        if(account.getBranchName()!=null){
            existingAccount.setBranchName(account.getBranchName());
        }
        if(account.getAccountType() != null) {
            existingAccount.setAccountType(account.getAccountType());
        }
        if(account.getBalance() != null) {
            existingAccount.setBalance(account.getBalance());
        }
        if(account.getBankName()!=null){
            existingAccount.setBankName(account.getBankName());
        }
        return accountRepository.save(existingAccount);
    }

    @Override
    public Account deleteAccount(Long accountId, String requestRole) {
        if(!requestRole.equalsIgnoreCase("ADMIN")){
            throw new RuntimeException("Unauthorized to update account");
        }
        Account account = getAccountById(accountId);
        accountRepository.delete(account);
        return account;
    }

    @Override
    public List<Account> getAccountByUserId(Long userId) {
        List<Account> accounts = accountRepository.findByUserId(userId);
        if (accounts == null || accounts.isEmpty()) {
            throw new RuntimeException("No accounts found for user with id: " + userId);
        }
        return accounts;
    }



    @Override
    public Account getAccountByAccountNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found with account number: " + accountNumber));
    }

    @Override
    public Account getAccountByUpi(String upi) {
        return accountRepository.findByUpi(upi)
                .orElseThrow(()-> new RuntimeException("Account not found with upi: " + upi));
    }

    @Override
    public Account updateAccountBalance(String  accountNumber, Double amount) {
        Account account = getAccountByAccountNumber(accountNumber); // Should throw if not found

        double newBalance = account.getBalance() + amount;
        if (newBalance < 0) {
            throw new IllegalArgumentException("Insufficient balance for this operation");
        }

        account.setBalance(newBalance);
        return accountRepository.save(account);
    }

}
