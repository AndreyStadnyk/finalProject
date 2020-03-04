package ua.com.danit.mapping;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.request.UserRequest;
import ua.com.danit.dto.response.UserResponse;
import ua.com.danit.entity.User;
import ua.com.danit.service.UserService;

@Component
public class UserMapper {

  private UserService userService;
  private ModelMapper modelMapper;

  @Autowired
  public UserMapper(UserService userService, ModelMapper modelMapper) {
    this.userService = userService;
    this.modelMapper = modelMapper;
  }

  public UserResponse create(UserRequest userRequest){
    User user = modelMapper.map(userRequest, User.class);
    User createdUser = userService.create(user);
    return modelMapper.map(createdUser, UserResponse.class);
  }
}
