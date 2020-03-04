package ua.com.danit.entity;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "birth_date", nullable = true)
  private LocalDate birthDate;

  @Column(name = "address", nullable = true)
  private String address;

  @Column(name = "gender", nullable = false)
  private String gender;

  @Column(name = "password", nullable = false)
  private String password;

  @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Post> posts = new ArrayList<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Like> likes = new ArrayList<>();

  @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Comment> comments;

  @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<FriendRequest> friendRequests;

  @ManyToMany
  @JoinTable(
      name = "user_friends",
      joinColumns = {@JoinColumn(name = "user1")},
      inverseJoinColumns = @JoinColumn(name = "user2")
          )
  private List<User> userFriends;

}
