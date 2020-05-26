package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.PostPic;

import java.util.List;

public interface PostPicRepository extends JpaRepository<PostPic, Long> {

  List<PostPic> getByPost(Post post);

  void deleteByImagePath(String imageToDeletePath);

}
