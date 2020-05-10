package ua.com.danit.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;

@RestController
@RequestMapping("/api")
public class FileController {
  @RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Object> uploadFile(@RequestParam ("file") MultipartFile file) throws IOException{
    File convertFile = new File("d:\\example\\" + file.getOriginalFilename());
    convertFile.createNewFile();
    FileOutputStream fout = new FileOutputStream(convertFile);
    fout.write(file.getBytes());
    fout.close();
    return new ResponseEntity<>("File is uploaded successfully", HttpStatus.OK);
  }

}
