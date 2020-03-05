package ua.com.danit.dto.response;


import lombok.Data;
import ua.com.danit.entity.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserResponse {

  private String username;
  private String firstName;
  private String lastName;
  private LocalDate birthDate;
  private String address;
  private String gender;
  private List<Post> posts = new ArrayList<>();
  private List<Like> likes = new ArrayList<>();
  private List<Comment> comments;
  private List<FriendRequest> friendRequests;
  private List<User> userFriends;

}
