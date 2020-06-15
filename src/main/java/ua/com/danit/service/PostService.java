package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Like;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.User;
import ua.com.danit.repository.PostRepository;

import java.util.Date;
import java.sql.Timestamp;
import java.util.Optional;

@Service
public class PostService {

  private PostRepository postRepository;
  private UserService userService;

  @Autowired
  public PostService(PostRepository postRepository, UserService userService) {
    this.postRepository = postRepository;
    this.userService = userService;
  }

  public Post create(Post post, String ownerUsername) {
    post.setAuthor(userService.getCurrentUser());
    post.setOwner(userService.findByUsername(ownerUsername));
    post.setId(null);
    Date date = new Date();
    post.setDate(new Timestamp(date.getTime()));
    postRepository.save(post);
    return post;
  }

  private void checkIsCurrentUserTheAuthor(Post post) {
    if (!userService.isCurrentUser(post.getAuthor().getUsername())) {
      throw new RuntimeException();
    }
  }

  public void checkIsCurrentUserTheAuthorOrOwner(Post post) {
    if (!userService.isCurrentUser(post.getAuthor().getUsername())
        || !userService.isCurrentUser(post.getOwner().getUsername())) {
      throw new RuntimeException();
    }
  }

  public Post update(String text, Long postId) {
    Post post = postRepository
        .findById(postId)
        .orElseThrow(RuntimeException::new);
    checkIsCurrentUserTheAuthor(post);
    post.setText(text);
    return postRepository.save(post);
  }

  public Post deletePostById(long postId) {
    Post post = postRepository
        .findById(postId)
        .orElseThrow(RuntimeException::new);
    checkIsCurrentUserTheAuthorOrOwner(post);
    postRepository.delete(post);
    return post;
  }

  public Post getPostById(long postId) {
    return postRepository.findById(postId)
        .orElseThrow(RuntimeException::new);
  }

  public Page<Post> getAllPostsForCurrentUserWithPagination(Pageable pageable) {
    return postRepository.findPostsByOwner(userService.getCurrentUser(), pageable);
  }

  public Page<Post> getAllPostsForCurrentUserAndFriendsWithPagination(Pageable pageable) {
    return postRepository.findPostsByOwnerAndUsernamesFriends(userService.getCurrentUser()
        .getUsername(), pageable);
  }

  public Page<Post> getAllPostsForAnotherUserWithPagination(String username, Pageable pageable) {
    return postRepository.findPostsByUsername(username, pageable);
  }

  public Post getOrRemoveLikeByPostId(long postId) {
    Post post = postRepository.findById(postId).orElseThrow(RuntimeException::new);
    String userName = userService.getCurrentUser().getUsername();
    Optional<Like> likeOptional = post.getLikes()
        .stream()
        .filter(like -> like.getUser().getUsername().equals(userName) && like.getPost().getId().equals(post.getId()))
        .findFirst();
    if (likeOptional.isPresent()) {
      post.getLikes().remove(likeOptional.get());
      return postRepository.save(post);
    } else {
      Like likeNew = new Like();
      User currentUser = userService.getCurrentUser();
      likeNew.setUser(currentUser);
      likeNew.setPost(post);
      post.getLikes().add(likeNew);
      return postRepository.save(post);
    }

  }
}
