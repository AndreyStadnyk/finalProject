package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.com.danit.dto.response.FriendRequestResponse;
import ua.com.danit.entity.FriendRequest;
import ua.com.danit.service.FriendRequestService;


@RestController
@RequestMapping("api/request")
public class RequestController {

  private FriendRequestService requestService;

  @Autowired
  public RequestController(FriendRequestService requestService) {
    this.requestService = requestService;
  }

  @PostMapping("/friendRequest")
  public ResponseEntity<FriendRequestResponse> create(@RequestBody FriendRequest friendRequest) {
    return null;
  }
  @GetMapping("/get/{userId}")
  public ResponseEntity<FriendRequestResponse> getFriendRequest(@PathVariable Long userId,
                                                                @RequestBody FriendRequest friendRequest){
    return ResponseEntity.ok(friendRequestMapper.);
  }

//  @DeleteMapping("/delete/{userId}")
}

