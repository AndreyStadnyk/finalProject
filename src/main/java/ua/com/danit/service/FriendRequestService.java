package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.com.danit.entity.FriendRequest;
import ua.com.danit.entity.User;
import ua.com.danit.repository.FriendRequestRepository;

@Service
public class FriendRequestService {
  private FriendRequestRepository friendRequestRepository;
  private UserService userService;

  @Autowired
  public FriendRequestService(FriendRequestRepository friendRequestRepository, UserService userService) {
    this.friendRequestRepository = friendRequestRepository;
    this.userService = userService;
  }

  public FriendRequest newFriendRequest(String receiver) {
    FriendRequest friendRequest = new FriendRequest();
    friendRequest.setRequester(userService.getCurrentUser());
    friendRequest.setReceiver(userService.findByUsername(receiver));
    return friendRequestRepository.save(friendRequest);
  }

//  public FriendRequest getFriendRequestByReceiver(String receiver) {
//    User requestReceiver = userService.findByUsername(receiver);
//    User requestRequester = userService.getCurrentUser();
//    return friendRequestRepository.findFriendRequestByReceiverAndRequester(requestReceiver, requestRequester);
//  }

//  public FriendRequest deleteFriendRequest(String receiver, String requester) {
//    User requestReceiver = userService.findByUsername(receiver);
//    User requestRequester = userService.findByUsername(requester);
//    return friendRequestRepository.deleteFriendRequestByRequesterAndReceiver(requestReceiver, requestRequester);
//  }
}
