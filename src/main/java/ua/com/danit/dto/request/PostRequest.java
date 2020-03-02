package ua.com.danit.dto.request;

import lombok.Data;

@Data
public class PostRequest {

  public long id;
  public String owner;
  public String text;
}
