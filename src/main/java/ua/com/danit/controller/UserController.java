package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ua.com.danit.dto.request.UserRequest;
import ua.com.danit.dto.response.UserResponse;
import ua.com.danit.mapping.UserMapper;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private UserMapper userMapper;

  @Autowired
  public UserController(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @PostMapping
  public ResponseEntity<UserResponse> create(@RequestBody UserRequest userRequest) {
    return ResponseEntity.ok(userMapper.create(userRequest));
  }

  @PutMapping
  public ResponseEntity<UserResponse> updateUser(@RequestBody UserRequest userRequest) {
    return ResponseEntity.ok(userMapper.updateUser(userRequest));
  }

  @GetMapping("/{username}")
  public ResponseEntity<UserResponse> getUserByUsername(@PathVariable String username) {
    return ResponseEntity.ok(userMapper.findById(username));
  }

  @GetMapping("/current")
  public ResponseEntity<UserResponse> getCurrentUser() {
    return ResponseEntity.ok(userMapper.getCurrentUser());
  }

  @GetMapping("/search")
  public ResponseEntity<List<UserResponse>> searchForUsersListByName(@RequestParam String queryStr) {

    List<UserResponse> foundUsers = userMapper.searchForUsersListByName(queryStr);
    return ResponseEntity.ok(foundUsers);

  }

}
