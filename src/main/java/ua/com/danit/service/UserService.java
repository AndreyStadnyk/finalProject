package ua.com.danit.service;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.response.GenericResponse;
import ua.com.danit.entity.PasswordResetToken;
import ua.com.danit.entity.User;
import ua.com.danit.repository.PasswordTokenRepository;
import ua.com.danit.repository.UserRepository;
import java.beans.FeatureDescriptor;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.Locale;
import java.util.stream.Stream;

@Service
public class UserService implements UserDetailsService {
  private static final int EXPIRATION = 24 * 60 * 60 * 1000;
  private UserRepository userRepository;
  private BCryptPasswordEncoder passwordEncoder;
  private PasswordTokenRepository passwordTokenRepository;
  private JavaMailSender mailSender;

  @Autowired
  public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder,
                     PasswordTokenRepository passwordTokenRepository, JavaMailSender mailSender) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.passwordTokenRepository = passwordTokenRepository;
    this.mailSender = mailSender;
  }

  public User create(User user) {
    //user.setPassword(passwordEncoder.encode(user.getPassword()));
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

  public User findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public List<User> searchForUsersListByName(String queryStr) {

    return userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(queryStr, queryStr);

  }

  public User findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication instanceof AnonymousAuthenticationToken) {
      return null;
    } else {
      return userRepository.findByUsername(authentication.getName());
    }
  }

  public boolean isCurrentUser(String username) {
    return (username.equals(this.getCurrentUser().getUsername()));
  }

  public GenericResponse resetPassword(HttpServletRequest request, User userRequest) {
    String userName = userRequest.getUsername();
    String email = userRequest.getEmail();
    User user = email == null ? this.findByUsername(userName) : this.findUserByEmail(email);
    if (user == null) {
      throw new RuntimeException();
    }
    String token = UUID.randomUUID().toString();
    this.createPasswordResetTokenForUser(user, token);
    mailSender.send(constructResetTokenEmail(getAppUrl(request), request.getLocale(), token, user));
    String messageResetPasswordEmail =
        "We have sent an email to your mail. Please follow the instructions in it to reset your password!";
    return new GenericResponse(messageResetPasswordEmail);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = this.findByUsername(username);
    org.springframework.security.core.userdetails.User.UserBuilder builder = null;
    if (user != null) {
      builder = org.springframework.security.core.userdetails.User.withUsername(username);
      builder.password(new BCryptPasswordEncoder().encode(user.getPassword()));
      builder.roles("USER");
    } else {
      throw new UsernameNotFoundException("User not found.");
    }
    return builder.build();
  }


  public void createPasswordResetTokenForUser(User user, String token) {
    Date currentDate = new Date();
    PasswordResetToken myToken = new PasswordResetToken();
    myToken.setUser(user);
    myToken.setToken(token);
    myToken.setExpiryDate(new Date(currentDate.getTime() + EXPIRATION));
    passwordTokenRepository.save(myToken);
  }

  private SimpleMailMessage constructResetTokenEmail(String contextPath, Locale locale, String token, User user) {
    String url = contextPath
        + "api/users/changePassword?username="
        + user.getUsername() + "&token="
        + token;
    String message = "Hello," + user.getUsername() + "! "
        + "We have received the password change request for your Facebook. "
        + "Please, follow this link for password reset:";
    return constructEmail("Reset Password", message + url, user);
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

  public Boolean validatePasswordResetToken(String username, String token) {
    PasswordResetToken passToken = passwordTokenRepository.findPasswordResetTokenByToken(token);
    if ((passToken == null) || !(passToken.getUser().getUsername().equals(username))) {
      return false;
    }

    Date currentDate = new Date();
    if (currentDate.after(passToken.getExpiryDate())) {
      return false;
    } else {
      return true;
    }
  }

  @Transactional
  public GenericResponse changePassword(String username, String token, String pass1, String pass2) {
    String changePassSuccessful = "Your password was upgrated!";
    String changePassFailed = "Password change failed!";
    String changePassStatus;

    try {
      Boolean isTokenValid = validatePasswordResetToken(username, token);
      if (isTokenValid && (pass1.equals(pass2))) {
        User user = findByUsername(username);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        passwordTokenRepository.deleteByToken(token);
        updateUser(user);
        changePassStatus = changePassSuccessful;
      } else {
        changePassStatus = changePassFailed;
      }
      return new GenericResponse(changePassStatus);
    } catch (Exception e) {
      return new GenericResponse(changePassFailed, e.toString());
    }
  }
}
