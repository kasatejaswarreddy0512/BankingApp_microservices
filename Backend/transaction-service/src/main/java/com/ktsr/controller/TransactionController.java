package com.ktsr.controller;

import com.ktsr.dto.UserDto;
import com.ktsr.entity.Transaction;
import com.ktsr.feign.UserServiceClient;
import com.ktsr.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;
    private final UserServiceClient userServiceClient;

    @PostMapping("/deposit/{accountNumber}")
    public ResponseEntity<Transaction> deposit(@PathVariable String accountNumber,
                                               @RequestParam double amount,
                                               @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(transactionService.deposit(accountNumber, amount, authHeader));
    }

    @PostMapping("/withdraw/{accountNumber}")
    public ResponseEntity<Transaction> withdraw(@PathVariable String accountNumber,
                                                @RequestParam double amount,
                                                @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(transactionService.withdraw(accountNumber, amount, authHeader));
    }

    @PostMapping("/transfer/{fromAccountNumber}/to/{toAccountNumber}")
    public ResponseEntity<Transaction> transfer(@PathVariable String fromAccountNumber,
                                                @PathVariable String toAccountNumber,
                                                @RequestParam double amount,
                                                @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(transactionService.transfer(fromAccountNumber, toAccountNumber, amount, authHeader));
    }

    @PostMapping("/upi/{fromUpi}/to/{toUpi}")
    public ResponseEntity<Transaction> upiTransfer(@PathVariable String fromUpi,
                                                @PathVariable String toUpi,
                                                @RequestParam double amount,
                                                @RequestHeader("Authorization") String authHeader){
        return ResponseEntity.ok(transactionService.upiTransfer(fromUpi, toUpi, amount, authHeader));
    }


    @GetMapping("/{accountNumber}")
    public ResponseEntity<List<Transaction>> getTransactionByAccountId(@PathVariable String accountNumber,
                                                                       @RequestHeader("Authorization") String authHeader){
        return ResponseEntity.ok(transactionService.getTransactionByAccountId(accountNumber  ,authHeader));
    }
}
