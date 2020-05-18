package ua.com.danit.entity;

import lombok.Data;

import javax.persistence.GenerationType;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "post_pics")
public class PostPic {
  @Id
  @Column(name = "image_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long Id;

  @ManyToOne(targetEntity = Post.class, fetch = FetchType.EAGER)
  @JoinColumn(nullable = true, name = "post_id")
  Post post;

  String imagePath;
}
