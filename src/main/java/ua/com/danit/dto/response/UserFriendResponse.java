package ua.com.danit.dto.response;

import lombok.Data;

@Data
public class UserFriendResponse {
  public Long id;
  public String user1Username;
  public String user2Username;
}
