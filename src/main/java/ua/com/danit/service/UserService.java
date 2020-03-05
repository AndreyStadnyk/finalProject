package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.repository.UserRepository;

@Service
public class UserService {
  private UserRepository userRepository;
  public BCryptPasswordEncoder passwordEncoder;

  @Autowired
  public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }


  public User create(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

  public User findById(String username) {
    return userRepository.findById(username).orElseThrow(RuntimeException::new);
  }

  public User getCurrentUser() {
    return userRepository.findAll().get(0);
  }
}
