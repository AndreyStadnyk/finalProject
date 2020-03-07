package ua.com.danit.mapping;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.request.PostRequest;
import ua.com.danit.dto.response.CommentResponse;
import ua.com.danit.dto.response.PostResponse;
import ua.com.danit.entity.Comment;
import ua.com.danit.entity.Post;
import ua.com.danit.service.CommentService;
import ua.com.danit.service.PostService;

import java.util.ArrayList;
import java.util.List;

@Component
public class PostMapper {

  private PostService postService;
  private CommentService commentService;
  private ModelMapper modelMapper;


  @Autowired
  public PostMapper(PostService postService, CommentService commentService, ModelMapper modelMapper) {
    this.postService = postService;
    this.commentService = commentService;
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
    List<PostResponse> resPosts = new ArrayList<>();

    for (Post post : posts) {
      PostResponse resPost = modelMapper.map(post, PostResponse.class);
      List<Comment> comments = commentService.getPostComments(post);

      for (Comment comment : comments) {
        resPost.addComment(modelMapper.map(comment, CommentResponse.class));
      }

      resPosts.add(resPost);
    }

    return resPosts;
  }

}
