package ua.com.danit.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity(name = "FriendRequest")
@Table(name = "friend_requests")
public class FriendRequest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column("requester")
  @ManyToOne
  @JoinColumn(name="username", nullable = false)
  private User requester;

  @Column("receiver")
  @ManyToOne
  @JoinColumn(name="username", nullable = false)
  private User receiver;
}
