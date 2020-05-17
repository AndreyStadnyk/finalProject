package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.com.danit.entity.Images;
import ua.com.danit.entity.User;

@Repository
public interface FileRepository extends JpaRepository<Images, Long> {
  public Images findByUser(User user);
}
