package ua.com.danit.dto.request;

import lombok.Data;
import ua.com.danit.entity.FriendRequest;
import ua.com.danit.entity.User;

import java.time.LocalDate;
import java.util.List;

@Data
public class UserRequest {

  private String username;
  private String firstName;
  private String lastName;
  private LocalDate birthDate;
  private String address;
  private String gender;
  private String password;
  private List<FriendRequest> friendRequests;
  private List<User> userFriends;
}
