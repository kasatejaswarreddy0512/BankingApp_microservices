package com.ktsr.repository;

import com.ktsr.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {


    List<Transaction> findByAccountNumber(String accountNumber);


    List<Transaction> findByTransactionDateBetween(LocalDateTime startDate, LocalDateTime endDate);


}
