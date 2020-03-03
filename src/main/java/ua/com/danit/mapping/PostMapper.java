package ua.com.danit.mapping;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

  public PostResponse create(PostRequest postRequest) {
    Post post = modelMapper.map(postRequest, Post.class);
    Post createdPost = postService.create(post);
    return modelMapper.map(createdPost, PostResponse.class);
  }

  public PostResponse update(PostRequest postRequest) throws Exception {
    Post updatedPost = postService.update(postRequest.getText());
    return modelMapper.map(updatedPost, PostResponse.class);
  }

  public PostResponse delete(PostRequest postRequest) throws Exception {
    Post deletedPost = postService.deletePostById(postRequest.getId());
    return modelMapper.map(deletedPost, PostResponse.class);
  }

  public PostResponse getAllPostsForCurrentUser(PostRequest postRequest) {
    List<Post> posts = postService.getAllPostsForCurrentUser();
    return modelMapper.map(posts, PostResponse.class);
  }
}
