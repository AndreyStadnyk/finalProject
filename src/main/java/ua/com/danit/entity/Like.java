package ua.com.danit.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "likes")
public class Like {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name ="username", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name ="post_id", nullable = false)
  private Post post;

}
