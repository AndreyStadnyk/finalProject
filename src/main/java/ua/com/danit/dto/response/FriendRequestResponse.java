package ua.com.danit.dto.response;

import lombok.Data;
import ua.com.danit.entity.User;

@Data
public class FriendRequestResponse {
  public Long id;
  public String receiverUsername;
  public String requesterUsername;
}
