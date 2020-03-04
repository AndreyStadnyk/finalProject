package ua.com.danit.dto.request;

import lombok.Data;
import ua.com.danit.entity.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
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
  private List<Post> posts = new ArrayList<>();
  private List<Like> likes = new ArrayList<>();
  private List<Comment> comments;
  private List<FriendRequest> friendRequests;
  private List<User> userFriends;
}
