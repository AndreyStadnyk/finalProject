package ua.com.danit.mapping;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.request.UserRequest;
import ua.com.danit.dto.response.GenericResponse;
import ua.com.danit.dto.response.UserResponse;
import ua.com.danit.entity.User;
import ua.com.danit.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Component
public class UserMapper {

  private UserService userService;
  private ModelMapper modelMapper;

  @Autowired
  public UserMapper(UserService userService, ModelMapper modelMapper) {
    this.userService = userService;
    this.modelMapper = modelMapper;
  }

  public UserResponse create(UserRequest userRequest) {
    User user = modelMapper.map(userRequest, User.class);
    User createdUser = userService.create(user);
    return modelMapper.map(createdUser, UserResponse.class);
  }

  public UserResponse updateUser(UserRequest userRequest) {
    User user = modelMapper.map(userRequest, User.class);
    User updatedUser = userService.updateUser(user);
    return modelMapper.map(updatedUser, UserResponse.class);
  }

  public UserResponse findByUsername(String username) {
    User receivedUser = userService.findByUsername(username);
    return modelMapper.map(receivedUser, UserResponse.class);
  }

  public UserResponse getCurrentUser() {
    User currentUser = userService.getCurrentUser();
    if (currentUser == null) {
      return null;
    } else {
      return modelMapper.map(currentUser, UserResponse.class);
    }
  }

  public List<UserResponse> searchForUsersListByName(String queryStr) {
    List<User> foundUsers = userService.searchForUsersListByName(queryStr);
    return modelMapper.map(foundUsers, new TypeToken<List<UserResponse>>(){}.getType());
  }

  public List<UserResponse> findUserFriends(Pageable pageable) {
    List<User> foundUsers = userService.findUserFriends(pageable);
    return modelMapper.map(foundUsers, new TypeToken<List<UserResponse>>(){}.getType());
  }

  public List<UserResponse> findAnotherUserFriends(String username, Pageable pageable) {
    List<User> foundUsers = userService.findAnotherUserFriends(username, pageable);
    return modelMapper.map(foundUsers, new TypeToken<List<UserResponse>>(){}.getType());
  }

  public GenericResponse resetPassword(HttpServletRequest request, UserRequest userRequest) {
    User user = modelMapper.map(userRequest, User.class);
    return userService.resetPassword(request, user);
  }

}
