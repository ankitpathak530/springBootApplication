package com.security.trustshield.Controller;

import com.security.trustshield.Jwt.JwtHelper;
import com.security.trustshield.DTO.JwtRequest;
import com.security.trustshield.DTO.JwtResponse;
import com.security.trustshield.Modals.User;
import com.security.trustshield.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager manager;


    @Autowired
    private JwtHelper helper;

    @Autowired
    private PasswordEncoder passwordEncoder;


    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @GetMapping("/test")
    private String test(){
        return "hello test successfully";
    }

    @PostMapping("/add")
    public String addUser(){
        User user=User.builder()
                .email("deepu")
                .password(this.passwordEncoder.encode("deepu"))
//                .user_id("123")
                .build();
        this.userRepository.save(user);

        return "done";
    }


    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getEmail(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .token(token)
                .email(userDetails.getUsername()).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

}
