package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.com.danit.entity.UserPic;
import ua.com.danit.entity.User;

@Repository
public interface UserPicRepository extends JpaRepository<UserPic, Long> {
  public UserPic findByUser(User user);

  public UserPic findByImagePath(String imagePath);

  public void deleteByImagePath(String imageToDeletePath);

  public boolean existsUserPicByUser(User user);
}
