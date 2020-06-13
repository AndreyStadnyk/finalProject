package ua.com.danit.exception;

public class FileStorageExeption extends RuntimeException {
  public FileStorageExeption(String message) {
    super(message);
  }

  public FileStorageExeption(String message, Throwable cause) {
    super(message, cause);
  }
}
