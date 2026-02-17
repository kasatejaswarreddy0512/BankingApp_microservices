package com.ktsr.controller;

import com.ktsr.dto.UserDto;
import com.ktsr.enity.Account;
import com.ktsr.feign.UserService;
import com.ktsr.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final UserService userService;


    @PostMapping("/create/{userId}")
    public ResponseEntity<Account> createAccount(
            @PathVariable Long userId,
            @RequestBody Account account,
            @RequestHeader("Authorization") String authHeader
    ) throws Exception {
        String jwt = authHeader.replace("Bearer", "").trim();
        ResponseEntity<UserDto> response= userService.getUserProfile("Bearer "+jwt);
        UserDto user=response.getBody();
        if(user==null){
            throw new Exception("User not found");
        }
        Account saveAccount=accountService.createAccount(userId,account,String.valueOf(user.getRole()));
        return new ResponseEntity<>(saveAccount, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long accountId, @RequestHeader("Authorization") String authHeader) {
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        return ResponseEntity.ok(accountService.getAccountById(accountId));
    }

    @PutMapping("/{accountId}")
    public ResponseEntity<Account> updateAccount(@PathVariable Long accountId,
                                                 @RequestBody Account account,
                                                 @RequestHeader("Authorization") String authHeader) {
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        assert userDto != null;
        Account updatedAccount = accountService.updateAccount(accountId, account, String.valueOf(userDto.getRole()));
        return ResponseEntity.ok(updatedAccount);
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Account> deleteAccount(@PathVariable Long accountId, @RequestHeader("Authorization") String authHeader) {
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        assert userDto != null;
        return ResponseEntity.ok(accountService.deleteAccount(accountId, String.valueOf(userDto.getRole())));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Account>> getAccountByUserId(@PathVariable Long userId, @RequestHeader("Authorization") String authHeader) {
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        assert userDto != null;
        return ResponseEntity.ok(accountService.getAccountByUserId(userId));
    }


    @GetMapping("/accountNumber/{accountNumber}")
    public ResponseEntity<Account> getAccountByAccountNumber(@PathVariable String accountNumber, @RequestHeader("Authorization") String authHeader) {
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        assert userDto != null;
        return ResponseEntity.ok(accountService.getAccountByAccountNumber(accountNumber));
    }

    @PutMapping("/updateBalance/{accountNumber}")
    public ResponseEntity<Account> updateAccountBalance(@PathVariable String accountNumber,
                                                        @RequestParam Double amount,
                                                        @RequestHeader("Authorization") String authHeader) {
        String jwt=authHeader.replace("Bearer","").trim();
        UserDto userDto=userService.getUserProfile("Bearer "+jwt).getBody();
        assert userDto != null;
        return ResponseEntity.ok(accountService.updateAccountBalance(accountNumber, amount));
    }
}
