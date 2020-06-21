package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.com.danit.entity.UserPic;
import ua.com.danit.entity.User;

@Repository
public interface UserPicRepository extends JpaRepository<UserPic, Long> {
  UserPic findByUser(User user);

  UserPic findByImagePath(String imagePath);

  void deleteByImagePath(String imageToDeletePath);

  boolean existsUserPicByUser(User user);
}
