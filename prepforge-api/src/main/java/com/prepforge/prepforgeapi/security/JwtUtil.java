package com.prepforge.prepforgeapi.security;

import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;
import java.util.Date;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@Component
public class JwtUtil {
    private static final long EXPIRATION_TIME = 60 * 60 * 1000;     
    private static final SecretKey SECRET_KEY =
        Keys.hmacShaKeyFor("prepforge-super-secret-key-for-jwt-authentication-2026".getBytes());

    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    public String extractUsername(String token) {

    Claims claims = Jwts.parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    public boolean validateToken(String token, String username) {
        String extractedUsername = extractUsername(token);
        return extractedUsername.equals(username);
    }
}
