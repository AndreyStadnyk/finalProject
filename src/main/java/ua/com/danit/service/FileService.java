package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.dto.response.GenericResponse;
import ua.com.danit.entity.PostPic;
import ua.com.danit.entity.UserPic;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.User;
import ua.com.danit.repository.PostPicRepository;
import ua.com.danit.repository.UserPicRepository;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileService {
  private UserPicRepository userPicRepository;
  private PostPicRepository postPicRepository;
  private UserService userService;
  private PostService postService;

  @Autowired
  public FileService(UserPicRepository userPicRepository, PostPicRepository postPicRepository, UserService userService,
                     PostService postService) {
    this.userPicRepository = userPicRepository;
    this.postPicRepository = postPicRepository;
    this.userService = userService;
    this.postService = postService;
  }

  private void storeFile(MultipartFile file, String filePath) throws IOException {
    File convertFile = new File(filePath);
    convertFile.createNewFile();
    FileOutputStream fout = new FileOutputStream(convertFile);
    fout.write(file.getBytes());
    fout.close();
  }

  private void deleteFile(String fileToDeletePath) throws IOException {
    Path filePath = Paths.get(fileToDeletePath);
    Files.delete(filePath);
  }

  @Transactional
  public GenericResponse storeUserPic(MultipartFile file) {
    String fileUploadingSuccessful = "File uploading successful complete!";
    String fileUploadFailed = "File uploading failed!";
    String fileUploadStatus;
    String imagePath = "./storage/images/userPic/" + file.getOriginalFilename();
    User currentUser = userService.getCurrentUser();

    try {
      if (userPicRepository.existsUserPicByUser(currentUser)) {
        UserPic currentUserPic = userPicRepository.findByUser(currentUser);
        this.deleteFile(currentUserPic.getImagePath());
        userPicRepository.delete(currentUserPic);
      }
      this.storeFile(file, imagePath);
      UserPic image = new UserPic();
      image.setUser(currentUser);
      image.setImagePath(imagePath);
      userPicRepository.save(image);
      fileUploadStatus = fileUploadingSuccessful;
      return new GenericResponse(fileUploadStatus);

    } catch (IOException e) {
      fileUploadStatus = fileUploadFailed;
      return new GenericResponse(fileUploadStatus, e.toString());
    }
  }

  public String getFilePathByUsername(String username) {
    String filePath = userPicRepository.findByUser(userService.findByUsername(username)).getImagePath();
    return filePath;
  }

  @Transactional
  public GenericResponse deleteUserPic(String imageToDeleteName) {
    String fileDeletingSuccessful = "File deleting successful complete!";
    String fileDeletingFailed = "File deleting failed!";
    String fileDeleteStatus;
    String imageToDeletePath = "./storage/images/userPic/" + imageToDeleteName;
    String ownerUserPicName = userPicRepository.findByImagePath(imageToDeletePath).getUser().getUsername();
    Boolean doesHavePermissionToDeleteUserPic = userService.isCurrentUser(ownerUserPicName);

    if (!doesHavePermissionToDeleteUserPic) {
      fileDeleteStatus = fileDeletingFailed;
      return new GenericResponse(fileDeleteStatus, "User picture can be deleted only by owner");
    }

    try {
      this.deleteFile(imageToDeletePath);
      userPicRepository.deleteByImagePath(imageToDeletePath);
      fileDeleteStatus = fileDeletingSuccessful;
      return new GenericResponse(fileDeleteStatus);

    } catch (IOException e) {
      fileDeleteStatus = fileDeletingFailed;
      return new GenericResponse(fileDeleteStatus, e.toString());
    }
  }

  @Transactional
  public GenericResponse storePostPic(Long postId, MultipartFile file) {
    String fileUploadingSuccessful = "File uploading successful complete!";
    String fileUploadFailed = "File uploading failed!";
    String fileUploadStatus;
    String imagePath = "./storage/images/postPic/" + file.getOriginalFilename();
    Post currentPost = postService.getPostById(postId);

    try {
      postService.checkIsCurrentUserTheAuthorOrOwner(currentPost);
      this.storeFile(file, imagePath);
      PostPic image = new PostPic();
      image.setPost(currentPost);
      image.setImagePath(imagePath);
      postPicRepository.save(image);
      fileUploadStatus = fileUploadingSuccessful;
      return new GenericResponse(fileUploadStatus);

    } catch (IOException e) {
      fileUploadStatus = fileUploadFailed;
      return new GenericResponse(fileUploadStatus, e.toString());
    }
  }

  public List<String> getFilePathByPostId(Long postId) {
    List<String> postPicsPathes = new ArrayList<>();
    Post currentPost = postService.getPostById(postId);
    for (PostPic postPic : postPicRepository.getByPost(currentPost)) {
      postPicsPathes.add(postPic.getImagePath());
    }
    return postPicsPathes;
  }

  @Transactional
  public GenericResponse deletePostPic(String imageToDeleteName) {
    String fileDeletingSuccessful = "File deleting successful complete!";
    String fileDeletingFailed = "File deleting failed!";
    String fileDeleteStatus;
    String imageToDeletePath = "./storage/images/postPic/" + imageToDeleteName;

    try {
      this.deleteFile(imageToDeletePath);
      postPicRepository.deleteByImagePath(imageToDeletePath);
      fileDeleteStatus = fileDeletingSuccessful;
      return new GenericResponse(fileDeleteStatus);

    } catch (IOException e) {
      fileDeleteStatus = fileDeletingFailed;
      return new GenericResponse(fileDeleteStatus, e.toString());
    }
  }

}


