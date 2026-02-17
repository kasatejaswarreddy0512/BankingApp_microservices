package com.ktsr.feign;

import com.ktsr.dto.AccountDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "account-service", url = "http://localhost:8082")
public interface AccountServiceClient {

    @GetMapping("/api/account/{accountId}")
    public ResponseEntity<AccountDto> getAccountById(@PathVariable Long accountId,
                                                     @RequestHeader("Authorization") String authHeader);

    @PutMapping("/api/account/updateBalance/{accountNumber}")
    public ResponseEntity<AccountDto> updateAccountBalance(@PathVariable String accountNumber,
                                                        @RequestParam Double amount,
                                                        @RequestHeader("Authorization") String authHeader);


    @GetMapping("/api/account/accountNumber/{accountNumber}")
    public ResponseEntity<AccountDto> getAccountByAccountNumber(@PathVariable String accountNumber, @RequestHeader("Authorization") String authHeader) ;

}
