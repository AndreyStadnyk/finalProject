package ua.com.danit.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user_friends")
public class UserFriends {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JoinColumn(name = "user1", nullable = false)
  private User user1;

  @ManyToOne
  @JoinColumn(name = "user2", nullable = false)
  private User user2;
}
