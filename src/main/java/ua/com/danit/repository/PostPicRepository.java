package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.PostPic;

public interface PostPicRepository extends JpaRepository<PostPic, Long> {
  public PostPic getByPost(Post post);

  public void deleteByImagePath(String imageToDeletePath);
}
