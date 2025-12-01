package com.manh.healthcare.service;

import com.manh.healthcare.dtos.AuthResponseDTO;
import com.manh.healthcare.dtos.CreateUserRequestDTO;
import com.manh.healthcare.dtos.LoginRequestDTO;
import com.manh.healthcare.dtos.UserResponseDTO;
import com.manh.healthcare.entity.ERole;
import com.manh.healthcare.entity.RefreshToken;
import com.manh.healthcare.entity.Role;
import com.manh.healthcare.entity.User;
import com.manh.healthcare.exception.ResourceNotFoundException;
import com.manh.healthcare.repository.RoleRepository;
import com.manh.healthcare.repository.UserRepository;
import com.manh.healthcare.security.JwtTokenProvider;
import jakarta.persistence.PrePersist;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RefreshTokenService refreshTokenService;

    public User createUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("User already exists");
        }
        return userRepository.save(user);
    }

    public UserResponseDTO getUserByUserName(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        UserResponseDTO userResponseDTO = modelMapper.map(user, UserResponseDTO.class);
        return userResponseDTO;
    }

    public List<UserResponseDTO> getAllUsers() {
        if (userRepository.count() == 0) {
            throw new ResourceNotFoundException("No users found");
        }
        List<UserResponseDTO> allUsers = userRepository.findAll().stream().map(user -> modelMapper.map(user, UserResponseDTO.class)).toList();
        return allUsers;
    }

    public User updateUser(String id, CreateUserRequestDTO user) {
        User newUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        newUser.setUsername(user.getUsername());
        if(!user.getPassword().isEmpty()){
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            newUser.setPassword(newUser.getPassword());
        }
        newUser.setEmail(user.getEmail());
        newUser.setPhoneNumber(user.getPhoneNumber());
        Set<String> strRoles = user.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER.name())
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "ROLE_ADMIN":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "ROLE_DOCTOR":
                        Role doctorRole = roleRepository.findByName(ERole.ROLE_DOCTOR.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(doctorRole);
                        break;
                    case "REGISTRATION_STAFF":
                        Role registration = roleRepository.findByName(ERole.REGISTRATION_STAFF.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(registration);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                        break;
                }
            });
        }
        newUser.setRoles(roles);
        return userRepository.save(newUser);
    }

    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found");
        }
        userRepository.deleteById(id);
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User signUp(CreateUserRequestDTO createUserRequestDTO) {
        if (userRepository.findByUsername(createUserRequestDTO.getUsername()).isPresent()) {
            throw new RuntimeException("Error: Username is already taken!");
        }
        if (userRepository.existsByEmail(createUserRequestDTO.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }
        String useridGenerate = generateUserId(createUserRequestDTO.getRole());
        User user = new User();
        user.setId(useridGenerate);
        user.setUsername(createUserRequestDTO.getUsername());
        user.setPassword(passwordEncoder.encode(createUserRequestDTO.getPassword()));
        user.setEmail(createUserRequestDTO.getEmail());
        user.setPhoneNumber(createUserRequestDTO.getPhoneNumber());
        Set<String> strRoles = createUserRequestDTO.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER.name())
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "ROLE_ADMIN":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "ROLE_DOCTOR":
                        Role doctorRole = roleRepository.findByName(ERole.ROLE_DOCTOR.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(doctorRole);
                        break;
                    case "REGISTRATION_STAFF":
                        Role registration = roleRepository.findByName(ERole.REGISTRATION_STAFF.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(registration);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER.name())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                        break;
                }
            });
        }
        user.setRoles(roles);
        return userRepository.save(user);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
    public AuthResponseDTO signIn(LoginRequestDTO loginRequest) {
        UsernamePasswordAuthenticationToken authCredentials = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(authCredentials);
        // UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(credentials.getEmail());
        User user = getUserByEmail(loginRequest.getEmail());
        // Create a AccessToken
        String token = jwtTokenProvider.generateToken(authentication);
        // Create a RefreshToken
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        AuthResponseDTO authResponseDTO = new AuthResponseDTO(user.getId(), token, refreshToken.getToken());
        return authResponseDTO;
    }
    public UserResponseDTO getUserDTOByEmail(String email) {
        User user = (User) userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setUsername(user.getUsername());
        userResponseDTO.setEmail(user.getEmail());
        Set<Role> strRoles = new HashSet<>();
        for (Role role : user.getRoles()) {
            strRoles.add(role);
        }
        userResponseDTO.setRoles(strRoles);
        return userResponseDTO;
    }

    // Auto-generate userId
    public String generateUserId(Set<String> roles) {
        String prefix = determinePrefix(roles);
        String yearMonth = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMM"));

        // Tìm số thứ tự cuối cùng cho prefix và tháng này
        String pattern = prefix + "-" + yearMonth + "-%";
        Long count = userRepository.countByUserIdStartingWith(pattern);

        String sequence = String.format("%03d", count + 1);

        return prefix + "-" + yearMonth + "-" + sequence;
    }

    private String determinePrefix(Set<String> roles) {
        if (roles.contains("ROLE_DOCTOR")) return "DOC";
        if (roles.contains("ROLE_RADIOLOGIST")) return "RAD";
        if (roles.contains("ROLE_NURSE")) return "NUR";
        if (roles.contains("ROLE_TECHNICIAN")) return "TEC";
        if (roles.contains("ROLE_ADMIN")) return "ADM";
        if (roles.contains("REGISTRATION_STAFF")) return "REC";
        return "USR";
    }
}
