package ua.com.danit.entity;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.GenerationType;
import javax.persistence.UniqueConstraint;


@Data
@Entity
@Table(name = "friend_requests",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"requester", "receiver"})})
public class FriendRequest {
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JoinColumn(name = "requester", nullable = false)
  private User requester;

  @ManyToOne
  @JoinColumn(name = "receiver", nullable = false)
  private User receiver;
}
