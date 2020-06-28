package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.com.danit.entity.FriendRequest;
import ua.com.danit.entity.User;
import ua.com.danit.repository.FriendRequestRepository;

import javax.transaction.Transactional;
import java.util.List;

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

  public List<FriendRequest> getAllFriendRequestByReceiver(String receiver) {
    return friendRequestRepository.findAllByReceiver(userService.findByUsername(receiver));
  }

  public FriendRequest deleteFriendRequestById(long id) {
    FriendRequest friendRequest = friendRequestRepository.findById(id).orElseThrow(RuntimeException::new);
    friendRequestRepository.deleteById(id);
    return friendRequest;
  }
}
