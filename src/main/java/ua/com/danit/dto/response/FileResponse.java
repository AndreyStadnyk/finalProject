package ua.com.danit.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

@AllArgsConstructor
@Data
public class FileResponse {

  Resource resource;
  MediaType contentType;

}
