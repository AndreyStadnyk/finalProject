package ua.com.danit.mapping;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.response.FriendRequestResponse;
import ua.com.danit.entity.FriendRequest;
import ua.com.danit.entity.User;
import ua.com.danit.service.FriendRequestService;

@Component
public class FriendRequestMapper {

  private FriendRequestService friendRequestService;
  private ModelMapper modelMapper;

  @Autowired
  public FriendRequestMapper(FriendRequestService friendRequestService, ModelMapper modelMapper) {
    this.friendRequestService = friendRequestService;
    this.modelMapper = modelMapper;
  }

  public FriendRequestResponse create(FriendRequest friendRequestRequest, User receiver) {
    FriendRequest friendRequest = modelMapper.map(friendRequestRequest, FriendRequest.class);
    FriendRequest newFriendRequest = friendRequestService.newFriendRequest(friendRequest, receiver);
    return modelMapper.map(newFriendRequest, FriendRequestResponse.class);
  }

}
