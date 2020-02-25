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
@Entity(name = "Comment")
@Table(name = "comments")
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "text", length = 280)
  private String text;

  @Column(name = "post_id")
  @ManyToOne
  @JoinColumn(name="id", nullable = false)
  private Post post;

  @Column(name = "author")
  @ManyToOne
  @JoinColumn(name="username", nullable = false)
  private User author;



}
