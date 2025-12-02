package com.manh.healthcare.controller;

import com.manh.healthcare.dtos.*;
import com.manh.healthcare.entity.User;
import com.manh.healthcare.security.JwtTokenProvider;
import com.manh.healthcare.service.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthenController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private ModelMapper modelMapper;
    @GetMapping("/{username}")
    public ResponseEntity<BaseResponse> getUserByUsername(@PathVariable String username) {
        UserResponseDTO userResponseDTO = userService.getUserByUserName(username);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("auth.success.findByUserName", userResponseDTO);
        return ResponseEntity.status(200).body(baseResponse);
    }
    @GetMapping("/all")
    public ResponseEntity<BaseResponse> getAllUsers() {
        List<UserResponseDTO> allUsers = userService.getAllUsers();
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("auth.success.getAll", allUsers);
        return ResponseEntity.status(200).body(baseResponse);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse> updateUser(@PathVariable String id, @RequestBody @Valid CreateUserRequestDTO user) {
        User userUpdate = userService.updateUser(id, user);
        UserResponseDTO userResponseDTO = modelMapper.map(userUpdate, UserResponseDTO.class);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("auth.success.update", userResponseDTO);
        return ResponseEntity.status(200).body(baseResponse);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("auth.success.delete");
        return ResponseEntity.status(HttpStatus.OK).body(baseResponse);
    }
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        AuthResponseDTO loginResponseDTO = userService.signIn(loginRequest);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("login successful", loginResponseDTO);
        return ResponseEntity.status(200).body(baseResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<BaseResponse> registerUser(@Valid @RequestBody CreateUserRequestDTO signUpRequest) {
        User newUser = userService.signUp(signUpRequest);
        UserResponseDTO userResponseDTO = modelMapper.map(newUser, UserResponseDTO.class);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("auth.success.signUp", userResponseDTO);
        return ResponseEntity.status(200).body(baseResponse);
    }
    @GetMapping("/getemail/{token}")
    public ResponseEntity<BaseResponse> getEmailInfo(@PathVariable String token) {
        String email = tokenProvider.getUsernameFromJWT(token);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("auth.success.getemailbuytoken", email);
        return ResponseEntity.status(200).body(baseResponse);
    }
    @GetMapping("/getuser/{email}")
    public ResponseEntity<BaseResponse> getRoleByEmail(@PathVariable String email) {
        UserResponseDTO userFound =  userService.getUserDTOByEmail(email);
        BaseResponse baseResponse = BaseResponse.createSuccessResponse("auth.success.getByUsername", userFound);
        return ResponseEntity.status(200).body(baseResponse);
    }
}
