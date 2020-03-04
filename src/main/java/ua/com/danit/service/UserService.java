package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.repository.UserRepository;

@Service
public class UserService {
  private UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getCurrentUser() {
    return userRepository.findAll().get(0);
  }

  public User findById(String username) {
    return userRepository.findById(username).orElseThrow(RuntimeException::new);
  }
}
