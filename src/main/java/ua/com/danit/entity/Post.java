package ua.com.danit.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity(name = "Post")
@Table(name = "posts")
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "username")
  @ManyToOne
  @JoinColumn(name="username", nullable = false)
  private User author;

  @Column(name = "date", nullable = false)
  private LocalDate date;

  @Column(name = "text", length = 280, nullable = false)
  private String text;



}
