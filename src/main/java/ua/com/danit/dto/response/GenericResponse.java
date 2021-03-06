package ua.com.danit.dto.response;

import lombok.Data;

@Data
public class GenericResponse {

  private String massage;
  private String error;

  public GenericResponse(String massage) {
    super();
    this.massage = massage;
  }

  public GenericResponse(String massage, String error) {
    super();
    this.massage = massage;
    this.error = error;
  }
}
