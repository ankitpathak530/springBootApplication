package com.security.trustshield.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponse {

    private String email;
    private String token;

}
