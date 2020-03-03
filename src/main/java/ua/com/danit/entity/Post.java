package ua.com.danit.entity;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.GenerationType;
import java.time.LocalDate;


@Data
@Entity
@Table(name = "posts")
public class Post {
  @Id
  @Column(name = "post_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JoinColumn(name = "owner", nullable = false)
  private User owner;

  @ManyToOne
  @JoinColumn(name = "author", nullable = false)
  private User author;

  @Column(name = "date")
  private LocalDate date;

  @Column(name = "text", length = 280, nullable = false)
  private String text;

}
