package ua.com.danit.dto;

import lombok.Data;
import java.io.Serializable;

@Data
public abstract class AbstractDto implements Serializable {
  public Long id;
}
