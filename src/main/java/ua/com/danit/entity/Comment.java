package ua.com.danit.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "comments")
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "text", length = 280)
  private String text;


  @ManyToOne
  @JoinColumn(name="post_id", nullable = false)
  private Post post;

  @ManyToOne
  @JoinColumn(name="username", nullable = false)
  private User author;



}
