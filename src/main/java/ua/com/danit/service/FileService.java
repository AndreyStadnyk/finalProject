package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.dto.response.GenericResponse;
import ua.com.danit.entity.Images;
import ua.com.danit.entity.User;
import ua.com.danit.repository.FileRepository;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class FileService {
  private FileRepository fileRepository;
  private UserService userService;

  @Autowired
  public FileService(UserService userService, FileRepository fileRepository) {
    this.fileRepository = fileRepository;
    this.userService = userService;
  }

  @Transactional
  public GenericResponse uploadUserPic(MultipartFile file) {
    String fileUploadingSuccessful = "File uploading successful complete!";
    String fileUploadFailed = "File uploading failed!";
    String fileUploadStatus;
    String imagePath = "./storage/images/userPic/" + file.getOriginalFilename();
    User currentUser = userService.getCurrentUser();

    try {
      this.uploadFile(file, imagePath);
      Images image = new Images();
      image.setUser(currentUser);
      image.setImagePath(imagePath);
      fileRepository.save(image);
      fileUploadStatus = fileUploadingSuccessful;
      return new GenericResponse(fileUploadStatus);

    } catch (IOException e) {
      fileUploadStatus = fileUploadFailed;
      return new GenericResponse(fileUploadStatus, e.toString());
    }
  }

  public void uploadFile(MultipartFile file, String filePath) throws IOException {
    File convertFile = new File(filePath);
    convertFile.createNewFile();
    FileOutputStream fout = new FileOutputStream(convertFile);
    fout.write(file.getBytes());
    fout.close();
  }

  public String getFilePathByUsername(String username) {
    String filePath = fileRepository.findByUser(userService.findByUsername(username)).getImagePath();
    return filePath;
  }
}


