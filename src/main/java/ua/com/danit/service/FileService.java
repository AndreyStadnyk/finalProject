package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.config.FileStorageProperties;
import ua.com.danit.dto.response.FileResponse;
import ua.com.danit.dto.response.GenericResponse;
import ua.com.danit.entity.Post;
import ua.com.danit.entity.PostPic;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPic;
import ua.com.danit.exception.EntityExceptionHandler;
import ua.com.danit.exception.FileStorageExeption;
import ua.com.danit.exception.MyFileNotFoundException;
import ua.com.danit.repository.PostPicRepository;
import ua.com.danit.repository.UserPicRepository;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
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
  private final Path fileStorageLocation;

  @Autowired
  public FileService(UserPicRepository userPicRepository, PostPicRepository postPicRepository, UserService userService,
                     PostService postService, FileStorageProperties fileStorageProperties) {
    this.userPicRepository = userPicRepository;
    this.postPicRepository = postPicRepository;
    this.userService = userService;
    this.postService = postService;
    this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

    try{
      Files.createDirectories(this.fileStorageLocation);
    } catch (Exception ex) {
      throw new FileStorageExeption("Could not create the directory where the uploaded files will be stored.", ex);
    }
  }

  private void storeFile(MultipartFile file, String filePath) throws IOException {
    if (file != null && !file.getOriginalFilename().isEmpty()) {

      String directoryPath = filePath.substring(0, filePath.indexOf(file.getOriginalFilename()));
      File uploadDir = new File(directoryPath);
      if (!uploadDir.exists()) {
        uploadDir.mkdir();
      }

      File convertFile = new File(filePath);
      convertFile.createNewFile();
      FileOutputStream fout = new FileOutputStream(convertFile);
      fout.write(file.getBytes());
      fout.close();


//      ApplicationContext context = new FileSystemXmlApplicationContext();
//      String path = "file:" + convertFile.getPath();
//      Resource resource = context.getResource(path);
//
//      try {
//        boolean isExist = resource.getFile().exists();
//        System.out.println(isExist);
//      } catch (Exception e) {
//        System.out.println(e.toString());
//      }
//      System.out.println(resource.getFile().getPath());
    }
  }

//  public MultipartFile getFile (String filePath) throws IOException, ClassNotFoundException {
//    try{
//      File file = new File(filePath);
//      FileInputStream inputStream = new FileInputStream(file);
//      ObjectInputStream objectInputStream = new ObjectInputStream(inputStream);
//      MultipartFile returningFile = (MultipartFile) objectInputStream.readObject();
//      return returningFile;
//    } catch (IOException e) {
//    }
//  }


  public Resource loadFileAsResource(String fileName) {
    try {
      Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
      Resource resource = new UrlResource(filePath.toUri());
      if(resource.exists()) {
        return resource;
      } else {
        throw new MyFileNotFoundException("File not found " + fileName);
      }
    } catch (MalformedURLException ex) {
      throw new MyFileNotFoundException("File not found " + fileName, ex);
    }
  }

  public String detectFileType (HttpServletRequest request, String absoluteFilePath) {
    String contentType = null;
    contentType = request.getServletContext().getMimeType(absoluteFilePath);
    if(contentType == null) {
      contentType = "application/octet-stream";
    }
    return contentType;
  }



  private void deleteFile(String fileToDeletePath) throws IOException {
    Path filePath = Paths.get(fileToDeletePath);
    Files.delete(filePath);
  }

  @Transactional
  public GenericResponse storeUserPic(MultipartFile file) {
    User currentUser = userService.getCurrentUser();
    String fileUploadingSuccessful = "File uploading successful complete!";
    String fileUploadFailed = "File uploading failed!";
    String fileUploadStatus;
    String imagePath = "storage/images/userPic/" + file.getOriginalFilename();

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

  public String getUserPicPathByUsername(String username) {
    String filePath = userPicRepository.findByUser(userService.findByUsername(username)).getImagePath();
    return filePath;
  }

  public FileResponse downloadFile(String fileName, HttpServletRequest request){
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
    String imageToDeletePath = "storage/images/userPic/" + imageToDeleteName;
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
    String imagePath = "storage/images/postPic" + file.getOriginalFilename();
    Post currentPost = postService.getPostById(postId);
    String postPicName = currentPost.getId().toString() + file.getContentType();

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
    String imageToDeletePath = "storage/images/postPic/" + imageToDeleteName;

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


