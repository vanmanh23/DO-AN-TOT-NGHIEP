package com.manh.healthcare.service;

import com.manh.healthcare.entity.RefreshToken;
import com.manh.healthcare.entity.User;
import com.manh.healthcare.repository.RefreshTokenRepository;
import com.manh.healthcare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepo;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(User user) {
        Optional<RefreshToken> optionalRefreshToken = refreshTokenRepository.findByUser(user);

        RefreshToken refreshToken;
        if (optionalRefreshToken.isPresent()) {
            refreshToken = optionalRefreshToken.get();
        } else {
            refreshToken = new RefreshToken();
            refreshToken.setUser(user);
        }
        refreshToken.setToken(UUID.randomUUID().toString());
        return refreshTokenRepository.save(refreshToken);
    }

    public void deleteByUser(User user) {
        refreshTokenRepository.deleteByUser(user);
    }

    public void revokeRefreshToken(String refreshToken) {
        refreshTokenRepository.deleteByToken(refreshToken);
    }
}
