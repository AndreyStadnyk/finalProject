package ua.com.danit.dto.response;


import lombok.Data;
import ua.com.danit.entity.FriendRequest;
import ua.com.danit.entity.User;

import java.time.LocalDate;
import java.util.List;

@Data
public class UserResponse {

  private String username;
  private String firstName;
  private String lastName;
  private LocalDate birthDate;
  private String address;
  private String gender;
  private List<FriendRequest> friendRequests;
  private List<User> userFriends;

}
