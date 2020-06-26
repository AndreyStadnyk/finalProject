package ua.com.danit.mapping;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.request.FriendRequestRequest;
import ua.com.danit.dto.response.FriendRequestResponse;
import ua.com.danit.entity.FriendRequest;
import ua.com.danit.entity.User;
import ua.com.danit.service.FriendRequestService;

import java.util.List;
import java.util.Optional;

@Component
public class FriendRequestMapper {
  private FriendRequestService friendRequestService;
  private ModelMapper modelMapper;

  @Autowired
  public FriendRequestMapper(FriendRequestService friendRequestService, ModelMapper modelMapper) {
    this.friendRequestService = friendRequestService;
    this.modelMapper = modelMapper;
  }

  public FriendRequestResponse create(String receiver) {
    FriendRequest newFriendRequest = friendRequestService.newFriendRequest(receiver);
    return modelMapper.map(newFriendRequest, FriendRequestResponse.class);
  }

  public FriendRequestResponse getAllFriendRequestByReceiver(String receiver) {
    List<FriendRequest> getFriendRequest = friendRequestService.getAllFriendRequestByReceiver(receiver);
    return modelMapper.map(getFriendRequest, new TypeToken<List<FriendRequestResponse>>(){}.getType());

  }

  public FriendRequestResponse delete(String requester, String receiver) {
    FriendRequest deleteFriendRequest = friendRequestService.deleteFriendRequest(requester, receiver);
    return modelMapper.map(deleteFriendRequest, FriendRequestResponse.class);
  }


}
