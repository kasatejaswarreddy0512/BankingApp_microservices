package com.ktsr.feign;

import com.ktsr.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "USER-SERVICE", url = "http://localhost:8081")
public interface UserService {

    @GetMapping("/api/user/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String authHeader);

    @GetMapping("/api/user/{userId}")
    public ResponseEntity<UserDto> getUserById(@RequestHeader("Authorization") String authHeader, @PathVariable Long userId);
}
