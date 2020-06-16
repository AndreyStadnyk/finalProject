package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.config.FileStorageProperties;
import ua.com.danit.dto.response.FileResponse;
import ua.com.danit.dto.response.GenericResponse;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.PostPic;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPic;
import ua.com.danit.exception.FileStorageExeption;
import ua.com.danit.exception.MyFileNotFoundException;
import ua.com.danit.repository.PostPicRepository;
import ua.com.danit.repository.PostRepository;
import ua.com.danit.repository.UserPicRepository;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import static java.nio.file.StandardCopyOption.ATOMIC_MOVE;

@Service
public class FileService {

  private PostRepository postRepository;
  private UserPicRepository userPicRepository;
  private PostPicRepository postPicRepository;
  private UserService userService;
  private PostService postService;
  private final Path fileStorageLocation;

  @Autowired
  public FileService(PostRepository postRepository, UserPicRepository userPicRepository,
                     PostPicRepository postPicRepository, UserService userService,
                     PostService postService, FileStorageProperties fileStorageProperties) {
    this.postRepository = postRepository;
    this.userPicRepository = userPicRepository;
    this.postPicRepository = postPicRepository;
    this.userService = userService;
    this.postService = postService;
    this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

    try {
      Files.createDirectories(this.fileStorageLocation);
    } catch (Exception ex) {
      throw new FileStorageExeption("Could not create the directory where the uploaded files will be stored.", ex);
    }
  }

  private Path storeFile(MultipartFile file) {
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());

    try {
      if (fileName.contains("..")) {
        throw new FileStorageExeption("Sorry! Filename contains invalid path sequence " + fileName);
      }

      Path targetLocation = this.fileStorageLocation.resolve(fileName);
      Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
      return targetLocation;
    } catch (IOException ex) {
      throw new FileStorageExeption("Could not store file " + fileName + ". Please try again!", ex);
    }
  }

  public Resource loadFileAsResource(String fileName) {
    try {
      Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
      Resource resource = new UrlResource(filePath.toUri());
      if (resource.exists()) {
        return resource;
      } else {
        throw new MyFileNotFoundException("File not found " + fileName);
      }
    } catch (MalformedURLException ex) {
      throw new MyFileNotFoundException("File not found " + fileName, ex);
    }
  }

  public String detectFileType(HttpServletRequest request, String absoluteFilePath) {
    String contentType = null;
    contentType = request.getServletContext().getMimeType(absoluteFilePath);
    if (contentType == null) {
      contentType = "application/octet-stream";
    }
    return contentType;
  }

  private void deleteFile(String fileToDeletePath) throws IOException {
    Path filePath = Paths.get(this.fileStorageLocation.resolve(fileToDeletePath).toString());
    Files.delete(filePath);
  }

  private String getAppUrl(HttpServletRequest request) {
    String url = request.getRequestURL().toString();
    int index = url.indexOf("api");
    url = url.substring(0, index);
    return url;
  }

  @Transactional
  public GenericResponse storeUserPic(HttpServletRequest request, MultipartFile file) {
    User currentUser = userService.getCurrentUser();
    String fileUploadingSuccessful = "File uploading successful complete!";
    String fileUploadFailed = "File uploading failed!";
    String fileUploadStatus;

    String newFileName = "UserPic" + currentUser.getUsername() + file.getOriginalFilename();
    Path imagePath = this.fileStorageLocation.resolve(newFileName);

    try {
      if (userPicRepository.existsUserPicByUser(currentUser)) {
        UserPic currentUserPic = userPicRepository.findByUser(currentUser);
        this.deleteFile(currentUserPic.getImagePath());
        userPicRepository.delete(currentUserPic);
      }

      this.storeFile(file);

      Path oldFile = this.fileStorageLocation.resolve(StringUtils.cleanPath(file.getOriginalFilename()));
      Path newFile = imagePath;
      Files.move(oldFile, newFile, ATOMIC_MOVE);

      UserPic image = new UserPic();
      image.setUser(currentUser);
      image.setImagePath(imagePath.getFileName().toString());
      userPicRepository.save(image);
      fileUploadStatus = fileUploadingSuccessful;
      return new GenericResponse(fileUploadStatus);

    } catch (IOException e) {
      fileUploadStatus = fileUploadFailed;
      return new GenericResponse(fileUploadStatus, e.toString());
    }
  }

  public String getUserPicPathByUsername(String username) {
    UserPic userPic = userPicRepository.findByUser(userService.findByUsername(username));
    if (userPic == null) {
      return "";
    } else {
      return userPic.getImagePath();
    }
  }

  public FileResponse downloadFile(String fileName, HttpServletRequest request) {
    String absoluteFilePath = null;

    Resource resource = this.loadFileAsResource(fileName);

    try {
      absoluteFilePath = resource.getFile().getAbsolutePath();
    } catch (IOException e) {
      e.printStackTrace();
    }

    MediaType contentType = MediaType.parseMediaType(this.detectFileType(request, absoluteFilePath));
    FileResponse fileResponse = new FileResponse(resource, contentType);
    return fileResponse;
  }

  @Transactional
  public GenericResponse deleteUserPic(String imageToDeleteName) {
    String fileDeletingSuccessful = "File deleting successful complete!";
    String fileDeletingFailed = "File deleting failed!";
    String fileDeleteStatus;

    String imageToDeletePath = this.fileStorageLocation.resolve(imageToDeleteName).toString();
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

    Post currentPost = postService.getPostById(postId);
    String newPostPicName = "PostPic" + currentPost.getId().toString() + "_" + file.getOriginalFilename();
    Path imagePath = this.fileStorageLocation.resolve(newPostPicName);

    try {

      //is result of this method working correct?!!!!!!!!!

      postService.checkIsCurrentUserTheAuthorOrOwner(currentPost);

      if (postPicRepository.getPostPicByImagePath(imagePath.toString()) != null) {
        fileUploadStatus = fileUploadFailed;
        return new GenericResponse(fileUploadStatus, "File with this name already exists!");
      }

      this.storeFile(file);
      Path oldFile = this.fileStorageLocation.resolve(StringUtils.cleanPath(file.getOriginalFilename()));
      Path newFile = imagePath;
      Files.move(oldFile, newFile, ATOMIC_MOVE);

      PostPic image = new PostPic();
      image.setPost(currentPost);
      image.setImagePath(imagePath.toString());
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
      String postPicFilename = Paths.get(postPic.getImagePath()).getFileName().toString();
      postPicsPathes.add(postPicFilename);
    }
    return postPicsPathes;
  }

  @Transactional
  public GenericResponse deletePostPic(String imageToDeleteName) {
    String fileDeletingSuccessful = "File deleting successful complete!";
    String fileDeletingFailed = "File deleting failed!";
    String fileDeleteStatus;

    Path imageToDeletePath = Paths.get(this.fileStorageLocation.toString()).resolve(imageToDeleteName);

    String postAuthorName = postPicRepository.getPostPicByImagePath(imageToDeletePath.toString())
        .getPost().getAuthor().getUsername();
    Boolean doesHavePermissionToDeletePostPic = userService.isCurrentUser(postAuthorName);
    if (!doesHavePermissionToDeletePostPic) {
      fileDeleteStatus = fileDeletingFailed;
      return new GenericResponse(fileDeleteStatus, "Post picture can be deleted only by owner");
    }

    try {
      Files.delete(imageToDeletePath);
      postPicRepository.deleteByImagePath(imageToDeletePath.toString());
      fileDeleteStatus = fileDeletingSuccessful;
      return new GenericResponse(fileDeleteStatus);
    } catch (IOException e) {
      fileDeleteStatus = fileDeletingFailed;
      return new GenericResponse(fileDeleteStatus, e.toString());
    }
  }
}


