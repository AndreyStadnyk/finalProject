package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.dto.request.FriendRequestRequest;
import ua.com.danit.dto.response.FriendRequestResponse;
import ua.com.danit.entity.FriendRequest;
import ua.com.danit.mapping.FriendRequestMapper;
import ua.com.danit.service.FriendRequestService;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("api/friendRequest")
public class FriendRequestController {
  private FriendRequestMapper friendRequestMapper;

  @Autowired
  public FriendRequestController(FriendRequestMapper friendRequestMapper) {
    this.friendRequestMapper = friendRequestMapper;
  }

  @PostMapping("/new/{receiver}")
  public ResponseEntity<FriendRequestResponse> create(@PathVariable String receiver) {
    return ResponseEntity.ok(friendRequestMapper.create(receiver));
  }

  @GetMapping("/get/{receiver}")
  public ResponseEntity<List<FriendRequestResponse>> getFriendRequest(@PathVariable String receiver) {
    List<FriendRequestResponse> foundFriendRequests = friendRequestMapper.getAllFriendRequestByReceiver(receiver);
    return ResponseEntity.ok(foundFriendRequests);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<FriendRequestResponse> delete(@PathVariable long id) {
    return ResponseEntity.ok(friendRequestMapper.deleteById(id));
  }
}

