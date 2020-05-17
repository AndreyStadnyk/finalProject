package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.dto.request.UserRequest;
import ua.com.danit.dto.response.GenericResponse;
import ua.com.danit.service.FileService;

@RestController
@RequestMapping("/api")
public class FileController {
  private FileService fileService;

  @Autowired
  public FileController(FileService fileService) {
    this.fileService = fileService;
  }

  @RequestMapping(value = "/upload/userPic", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public GenericResponse uploadFile(@RequestParam("file") MultipartFile file) {
    return fileService.uploadUserPic(file);
  }

  @GetMapping("/getUserPicPathByUsername")
  public String getUserPicPath (String username){
    return fileService.getFilePathByUsername(username);
  }

}
