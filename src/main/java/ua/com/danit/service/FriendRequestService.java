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
  public FriendRequestService(FriendRequestRepository friendRequestRepository){
    this.friendRequestRepository = friendRequestRepository;
  }

  public FriendRequest newFriendRequest(FriendRequest friendRequest, User receiver){
    friendRequest.setRequester(userService.getCurrentUser());
    friendRequest.setReceiver(receiver);
    friendRequestRepository.save(friendRequest);
    return friendRequest;
  };

  public void deleteFriendRequest(){};
}
