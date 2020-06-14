package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.dto.response.FileResponse;
import ua.com.danit.dto.response.GenericResponse;
import ua.com.danit.service.FileService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static org.springframework.web.servlet.function.RequestPredicates.contentType;

@RestController
@RequestMapping("/api/file")
public class FileController {
  private FileService fileService;

  @Autowired
  public FileController(FileService fileService) {
    this.fileService = fileService;
  }

  @RequestMapping(value = "/user-pic", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public GenericResponse uploadUserPic(@RequestParam("file") MultipartFile file) {
    return fileService.storeUserPic(file);
  }

  @GetMapping("/user-pic")
  public String getUserPicPath(@RequestParam String username) {
    return fileService.getUserPicPathByUsername(username);
  }

  @DeleteMapping("/user-pic")
  public GenericResponse deleteUserPic(@RequestParam ("imageName") String imageToDeleteName) {
    return fileService.deleteUserPic(imageToDeleteName);
  }

//  @RequestMapping(value = "/post-pic", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//  public GenericResponse uploadPostPic(@RequestParam ("postId") Long postId, @RequestParam("file") MultipartFile file) {
//    return fileService.storePostPic(postId, file);
//  }
//
//  @GetMapping("/post-pic")
//  public List<String> getPostPicPath(@RequestParam Long postId) {
//    return fileService.getFilePathByPostId(postId);
//  }
//
//  @DeleteMapping("/post-pic")
//  public GenericResponse deletePostPic(@RequestParam ("imageName") String imageToDeleteName) {
//    return fileService.deletePostPic(imageToDeleteName);
//  }

//  @GetMapping("/{pathFile}")
//  public MultipartFile getFile (@PathVariable String pathFile) {
//    return fileService.getFile (pathFile);
//  }
//

  @GetMapping("/downloadFile/{fileName:.+}")
  public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
    FileResponse file = fileService.downloadFile(fileName, request);

    return ResponseEntity.ok()
      .contentType(file.getContentType())
      .body(file.getResource());
  }

}
