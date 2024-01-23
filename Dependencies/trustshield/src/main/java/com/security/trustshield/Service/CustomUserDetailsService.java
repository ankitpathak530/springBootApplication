package com.security.trustshield.Service;

import com.security.trustshield.Modals.User;
import com.security.trustshield.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service

public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    public UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user= userRepository.findByEmail(username).orElseThrow(
                ()->new RuntimeException("User Not Found !!!")
        );


        return user;
    }


}
