package ua.com.danit.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.GenerationType;

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
