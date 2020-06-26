package ua.com.danit.entity;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.GenerationType;


@Data
@Entity
@Table(name = "friend_requests")
public class FriendRequest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public long id;

  @Column(name = "requester", nullable = false)
  public String requester;

  @Column(name = "receiver", nullable = false)
  public String receiver;
}
