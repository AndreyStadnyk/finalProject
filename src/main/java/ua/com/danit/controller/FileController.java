package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.dto.response.FileResponse;
import ua.com.danit.dto.response.GenericResponse;
import ua.com.danit.service.FileService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/file")
public class FileController {
  private FileService fileService;

  @Autowired
  public FileController(FileService fileService) {
    this.fileService = fileService;
  }

  @RequestMapping(value = "/user-pic", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public GenericResponse uploadUserPic(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
    return fileService.storeUserPic(request, file);
  }

  @GetMapping("/user-pic")
  public String getUserPicPath(@RequestParam String username) {
    return fileService.getUserPicPathByUsername(username);
  }

  @DeleteMapping("/user-pic")
  public GenericResponse deleteUserPic(@RequestParam ("imageName") String imageToDeleteName) {
    return fileService.deleteUserPic(imageToDeleteName);
  }

  @RequestMapping(value = "/post-pic", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public GenericResponse uploadPostPic(@RequestParam ("postId") Long postId, @RequestParam("file") MultipartFile file) {
    return fileService.storePostPic(postId, file);
  }

  @GetMapping("/post-pic")
  public List<String> getPostPicPath(@RequestParam Long postId) {
    return fileService.getFilePathByPostId(postId);
  }

  @DeleteMapping("/post-pic")
  public GenericResponse deletePostPic(@RequestParam ("imageName") String imageToDeleteName) {
    return fileService.deletePostPic(imageToDeleteName);
  }

  @GetMapping("/downloadFile/{fileName:.+}")
  public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
    FileResponse file = fileService.downloadFile(fileName, request);

    return ResponseEntity.ok()
      .contentType(file.getContentType())
      .body(file.getResource());
  }

}
