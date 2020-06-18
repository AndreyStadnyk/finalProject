package ua.com.danit.dto.request;


import lombok.Data;
import ua.com.danit.entity.User;

@Data
public class FriendRequestRequest {
  public User receiver;
  public User requester;
}
