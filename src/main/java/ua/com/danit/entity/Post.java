package ua.com.danit.entity;

import lombok.Data;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;


@Data
@Entity
@Table(name = "posts")
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long post_id;

  @ManyToOne
  @JoinColumn(name="username", nullable = false)
  private User author;

  @Column(name = "date", nullable = false)
  private LocalDate date;

  @Column(name = "text", length = 280, nullable = false)
  private String text;

}
