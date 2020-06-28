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

  public List<FriendRequestResponse> getAllFriendRequestByReceiver(String receiver) {
    List<FriendRequest> getFriendRequest = friendRequestService.getAllFriendRequestByReceiver(receiver);
    return modelMapper.map(getFriendRequest, new TypeToken<List<FriendRequestResponse>>(){}.getType());
  }

  public FriendRequestResponse deleteById(long id) {
    FriendRequest deletedFriendRequest = friendRequestService.deleteFriendRequestById(id);
    return modelMapper.map(deletedFriendRequest, FriendRequestResponse.class);
  }

}
