package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.User;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

  List<Post> findPostsByOwner(User owner);

  Post deletePostById(Long id);

}
