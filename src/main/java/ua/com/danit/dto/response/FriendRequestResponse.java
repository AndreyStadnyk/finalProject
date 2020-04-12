package ua.com.danit.dto.response;

import lombok.Data;

@Data
public class FriendRequestResponse {
  public Long id;
  public String requesterUsername;
  public String receiverUsername;
}
