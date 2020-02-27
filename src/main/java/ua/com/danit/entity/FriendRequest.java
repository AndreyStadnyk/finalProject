package ua.com.danit.entity;


import lombok.Data;
import javax.persistence.*;


@Data
@Entity
@Table(name = "friend_requests")
public class FriendRequest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JoinColumn(name="requester", nullable = false)
  private User requester;

  @ManyToOne
  @JoinColumn(name="receiver", nullable = false)
  private User receiver;
}
