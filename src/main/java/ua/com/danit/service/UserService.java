package ua.com.danit.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.response.GenericResponse;
import ua.com.danit.entity.PasswordResetToken;
import ua.com.danit.entity.User;
import ua.com.danit.repository.PasswordTokenRepository;
import ua.com.danit.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import java.beans.FeatureDescriptor;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class UserService {
  private UserRepository userRepository;
  private BCryptPasswordEncoder passwordEncoder;

  @Autowired
  public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Autowired
  private PasswordTokenRepository passwordTokenRepository;

  @Autowired
  private JavaMailSender mailSender;

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

  public User findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User getCurrentUser() {
    return userRepository.findAll().get(0);
  }

  public boolean isCurrentUser(String username) {
    return (username.equals(this.getCurrentUser().getUsername()));
  }

  public void resetPassword(HttpServletRequest request, User userRequest) {
    String userName = userRequest.getUsername();
    String email = userRequest.getEmail();
    User user = email == null ? this.findById(userName) : this.findUserByEmail(email);
    if (user == null) {
      throw new RuntimeException();
    }
    String token = UUID.randomUUID().toString();
    this.createPasswordResetTokenForUser(user, token);
    mailSender.send(constructResetTokenEmail(getAppUrl(request), request.getLocale(), token, user));
//    return new GenericResponse(
//      messages.getMessage("message.resetPasswordEmail", null, request.getLocale()));

  }

  public void createPasswordResetTokenForUser(User user, String token) {
    PasswordResetToken myToken = new PasswordResetToken();
    myToken.setUser(user);
    myToken.setToken(token);
    passwordTokenRepository.save(myToken);
  }

  private SimpleMailMessage constructResetTokenEmail(String contextPath, Locale locale, String token, User user) {
    String url = contextPath
      + "api/users/changePassword?id="
      + user.getUsername() + "&token="
      + token;
    String message = "Hello," + user.getUsername()+ "! "
      + "We have received the password change request for your Facebook. " +
      "Please, follow this link for password reset:";
    return constructEmail("Reset Password", message + " \r\n" + url, user);
  }

  private SimpleMailMessage constructEmail(String subject, String body, User user) {
    SimpleMailMessage email = new SimpleMailMessage();
    email.setSubject(subject);
    email.setText(body);
    email.setTo(user.getEmail());
    email.setReplyTo("noreply@fs9finalproject.com");
    email.setFrom("security@fs9finalproject.com");
    return email;
  }

  private String getAppUrl(HttpServletRequest request) {
    String url = request.getRequestURL().toString();
    int index = url.indexOf("api");
    url = url.substring(0, index);
    return url;
  }


}
