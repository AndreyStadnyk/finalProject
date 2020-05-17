package ua.com.danit.entity;

import lombok.Data;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;
import javax.persistence.GenerationType;

@Data
@Entity
@Table(name = "images")
public class Images {

  @Id
  @Column(name = "image_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
  @JoinColumn(nullable = true, name = "username")
  private User user;

  private String imagePath;
}
