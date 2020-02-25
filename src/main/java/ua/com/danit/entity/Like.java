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
@Entity(name = "Like")
@Table(name = "likes")
public class Like {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_name")
  @ManyToOne
  @JoinColumn(name ="username", nullable = false)
  private User user;

  @Column(name = "post_id")
  @ManyToOne
  @JoinColumn(name ="id", nullable = false)
  private Post post;




}
