package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.User;
import ua.com.danit.repository.PostRepository;

import java.util.List;

@Service
public class PostService {

  private PostRepository postRepository;
  private UserService userService;

  @Autowired
  public PostService(PostRepository postRepository) {
    this.postRepository = postRepository;
  }

  @Autowired
  public User getCurrentUser(UserService userService) {
    return userService.getCurrentUser();
  }

  public Post getCurrentPost() {
    return postRepository.findAll().get(0);
  }

  public Post create(Post post) {
    return post;
  }

  public Post update(String text) throws Exception {
    if (getCurrentUser(userService) != getCurrentPost().getAuthor()) {
      throw new Exception();
    }
    getCurrentPost().setText(text);
    return postRepository.save(getCurrentPost());
  }

  public Post deletePostById(long postId) throws Exception {
    if (getCurrentUser(userService) != getCurrentPost().getAuthor()) {
      throw new Exception();
    }

    return postRepository.deletePostById(postId);
  }

  public List<Post> getAllPostsForCurrentUser() {
    return postRepository.findPostsByOwner(getCurrentUser(userService));
  }

}



















