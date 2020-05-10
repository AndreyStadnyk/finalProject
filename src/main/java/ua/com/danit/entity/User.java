package ua.com.danit.entity;

import lombok.Data;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

  @Id
  @Column(name = "username", unique = true, nullable = false)
  private String username;

  @Column(name = "email", unique = true, nullable = false)
  private String email;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "birth_date", nullable = true)
  private LocalDate birthDate;

  @Column(name = "address", nullable = true)
  private String address;

  @Column(name = "gender", nullable = true)
  private String gender;

  @Column(name = "password", nullable = false)
  private String password;

  @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
  private List<Post> posts = new ArrayList<>();

  @OneToMany(mappedBy = "requester", cascade = CascadeType.ALL)
  private List<FriendRequest> friendRequests;

  @OneToMany(mappedBy = "user1", cascade = CascadeType.ALL)
  private List<UserFriends> userFriends;

}
