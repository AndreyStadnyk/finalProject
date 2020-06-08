package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.com.danit.dto.response.FriendRequestResponse;
import ua.com.danit.entity.FriendRequest;
import ua.com.danit.mapping.FriendRequestMapper;
import ua.com.danit.service.FriendRequestService;


@RestController
@RequestMapping("api/friendRequest")
public class FriendRequestController {
  private FriendRequestMapper friendRequestMapper;

  @Autowired
  public FriendRequestController(FriendRequestMapper friendRequestMapper) {
    this.friendRequestMapper = friendRequestMapper;
  }

  @PostMapping("/new/{receiver}")
  public ResponseEntity<FriendRequestResponse> create(@PathVariable String receiver,
                                                      @RequestBody FriendRequest friendRequest) {
    return ResponseEntity.ok(friendRequestMapper.create(friendRequest, receiver));
  }


//  @GetMapping("/get/{userId}")
//  public ResponseEntity<FriendRequestResponse> getFriendRequest(@PathVariable String userId,
//                                                                @RequestBody FriendRequest friendRequest){
//    return ResponseEntity.ok(friendRequestMapper.create(friendRequest, userId));
//  }

  @DeleteMapping("/delete/{requester}/{receiver}")
  public ResponseEntity<FriendRequestResponse> delete(@PathVariable String requester,
                                                      @PathVariable String receiver){
    return ResponseEntity.ok(friendRequestMapper.delete(requester, receiver));
  }


}

