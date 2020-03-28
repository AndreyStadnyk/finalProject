package ua.com.danit.service;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.repository.UserRepository;

import javax.management.MalformedObjectNameException;
import javax.management.ObjectName;
import javax.management.relation.Role;
import java.beans.FeatureDescriptor;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class UserService implements UserDetailsService {
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

  public User updateUser(User user) {
    User currentUser = this.getCurrentUser();
    BeanUtils.copyProperties(user, currentUser, getNullPropertyNames(user));
    return userRepository.save(currentUser);
  }

  private String[] getNullPropertyNames(User user) {
    BeanWrapper src = new BeanWrapperImpl(user);
    return Stream
      .of(src.getPropertyDescriptors())
      .map(FeatureDescriptor::getName)
      .filter(propertyName -> Objects.isNull(src.getPropertyValue(propertyName)))
      .toArray(String[]::new);
  }

  public User findById(String username) {
    return userRepository.findById(username).orElseThrow(RuntimeException::new);
  }

  public List<User> searchForUsersListByName(String queryStr) {

    return userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(queryStr, queryStr);

  }

  public User getCurrentUser() {
    return userRepository.findAll().get(0);
  }

  public boolean isCurrentUser(String username) {
    return (username.equals(this.getCurrentUser().getUsername()));
  }


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User userById = this.findById(username);
    ObjectName user;
    List<ObjectName> objectNames = new ArrayList<>();
    try {
      user = ObjectName.getInstance("user");
      objectNames.add(user);
    } catch (MalformedObjectNameException e) {
      e.printStackTrace();
    }
    Role userRole = new Role("USER_ROLE",
        objectNames);
    List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
    grantedAuthorities.add((GrantedAuthority) () -> "user");
    return new org.springframework.security.core.userdetails.User(userById.getUsername(),
        userById.getPassword(), grantedAuthorities);
  }
}
