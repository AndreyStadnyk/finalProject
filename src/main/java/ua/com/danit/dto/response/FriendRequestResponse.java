package ua.com.danit.dto.response;

import lombok.Data;
import ua.com.danit.entity.User;

@Data
public class FriendRequestResponse {
  public Long id;
  public String receiver;
  public String requester;
}
