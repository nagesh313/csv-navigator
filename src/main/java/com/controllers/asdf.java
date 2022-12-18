//package com.controllers;
//
//
//import org.hibernate.service.spi.ServiceException;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.DisabledException;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.context.request.WebRequest;
//import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.LinkedHashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@ControllerAdvice
//public class ControllerAdvisor extends ResponseEntityExceptionHandler {
//
//    @ControllerAdvice(UsernameNotFoundException.class)
//    public ResponseEntity handleServiceException(HttpServletRequest req, HttpServletResponse response, ServiceException e) {
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//    }
//
//    @ExceptionHandler(DisabledException.class)
//    public ResponseEntity handleDisabledUserException(HttpServletRequest req, HttpServletResponse response, ServiceException e) {
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//    }
//}
