package ua.com.danit.mapping;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.request.PostRequest;
import ua.com.danit.dto.response.PostResponse;
import ua.com.danit.entity.Post;
import ua.com.danit.service.PostService;

import java.util.List;

@Component
public class PostMapper {

  private PostService postService;
  private ModelMapper modelMapper;


  @Autowired
  public PostMapper(PostService postService, ModelMapper modelMapper) {
    this.postService = postService;
    this.modelMapper = modelMapper;
  }

  public PostResponse create(PostRequest postRequest, String ownerUsername) {
    Post post = modelMapper.map(postRequest, Post.class);
    Post createdPost = postService.create(post, ownerUsername);
    return modelMapper.map(createdPost, PostResponse.class);
  }

  public PostResponse update(PostRequest postRequest, long postId) {
    Post updatedPost = postService.update(postRequest.getText(), postId);
    return modelMapper.map(updatedPost, PostResponse.class);
  }

  public PostResponse delete(long postId) {
    Post deletedPost = postService.deletePostById(postId);
    return modelMapper.map(deletedPost, PostResponse.class);
  }

  public List<PostResponse> getAllPostsForCurrentUser() {
    List<Post> posts = postService.getAllPostsForCurrentUser();
    return modelMapper.map(posts, new TypeToken<List<PostResponse>>(){}.getType());
  }

  public Page<PostResponse> findPosts(Pageable pageable) {
    Page<Post> posts = postService.findPosts(pageable);
    return modelMapper.map(posts, new TypeToken<Page<PostResponse>>(){}.getType());
  }

  public PostResponse removeOrAddLikeByPostId(long postId) {
    Post post = postService.getOrRemoveLikeByPostId(postId);
    return modelMapper.map(post, PostResponse.class);
  }

}
