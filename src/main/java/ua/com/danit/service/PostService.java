package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Post;
import ua.com.danit.repository.PostRepository;

import java.util.List;


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
    post.setOwner(userService.findById(ownerUsername));
    post.setId(null);
    postRepository.save(post);
    return post;
  }

  private void checkIsCurrentUser(Post post) {
    if (userService.getCurrentUser().getUsername().equals(post.getAuthor().getUsername())) {
      throw new RuntimeException();
    }
  }

  public Post update(String text, Long postId) {
    Post post = postRepository
        .findById(postId)
        .orElseThrow(RuntimeException::new);
    checkIsCurrentUser(post);
    post.setText(text);
    return postRepository.save(post);
  }

  public Post deletePostById(long postId) {
    Post post = postRepository
        .findById(postId)
        .orElseThrow(RuntimeException::new);
    checkIsCurrentUser(post);
    postRepository.delete(post);
    return post;
  }

  public Post getPostById(long postId) {
    return postRepository.findById(postId)
        .orElseThrow(RuntimeException::new);
  }

  public List<Post> getAllPostsForCurrentUser() {
    return postRepository.findPostsByOwner(userService.getCurrentUser());
  }

}



















