package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.com.danit.dto.request.UserRequest;
import ua.com.danit.dto.response.UserResponse;
import ua.com.danit.mapping.UserMapper;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private UserMapper userMapper;

  @Autowired
  public UserController(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @PostMapping
  public ResponseEntity<UserResponse> create(@RequestBody UserRequest userRequest){
    return ResponseEntity.ok(userMapper.create(userRequest));
  }

  @GetMapping("/{username}")
  public ResponseEntity<UserResponse> getUserByUsername(@PathVariable String username){
    return ResponseEntity.ok(userMapper.findById(username));
  }


//  private UserService userService;
//
//  @Autowired
//  public UserController(UserService userService) {
//    this.userService = userService;
//  }
//
//  @RequestMapping(method = RequestMethod.GET, value = "/current")
//  @GetMapping("/current")
//  public ResponseEntity<User> getCurrentUser() {
//    User user = userService.getCurrentUser();
//    return ResponseEntity.ok(user);
//  }
//
//  @GetMapping
//  public ResponseEntity<List<User>> getAllUsers() {
//    return null;
//  }
}
