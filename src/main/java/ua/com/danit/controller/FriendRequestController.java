package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.com.danit.dto.response.FriendRequestResponse;
import ua.com.danit.entity.FriendRequest;
import ua.com.danit.mapping.FriendRequestMapper;
import ua.com.danit.service.FriendRequestService;

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
  public ResponseEntity<FriendRequestResponse> create(@PathVariable String receiver){
    return ResponseEntity.ok(friendRequestMapper.create(receiver));
  }

  @GetMapping("/get/{receiver}")
  public ResponseEntity<FriendRequestResponse> getFriendRequest(@PathVariable String receiver){
    return ResponseEntity.ok(friendRequestMapper.create(receiver));
  }

  @DeleteMapping("/delete/{receiver}/{requester}")
  public ResponseEntity<FriendRequestResponse> delete(@PathVariable Map<String, String> vals){
    return ResponseEntity.ok(friendRequestMapper.delete(vals.get("requester"), vals.get("requester")));
  }


}

