package ua.com.danit.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.User;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

  List<Post> findPostsByOwner(User owner);

  Page<Post> findPostsByOwner(User owner, Pageable pageable);

  @Query("select p from Post p where "
      + "( p.owner.username = :username)")
  Page<Post> findPostsByUsername(
      @Param("username")String username, Pageable pageable);

  @Query("select p from Post p where "
      + "( p.owner.username = :owner) or "
      + "p.owner.username IN (select user2.username from UserFriends "
      + "where user1.username = :owner "
      + ")")
  Page<Post> findPostsByOwnerAndUsernamesFriends(
      String owner, Pageable pageable);
}