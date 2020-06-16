package ua.com.danit.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.com.danit.entity.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
  User findByLastNameIgnoreCase(String firstName);

  List<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String queryName, String queryLastName);

  @Query("select u from User u where "
      + "u.username in (select user2 from UserFriends "
      + "where user1.username = :username"
      +  ")")
  List<User> findUserFriends(String username, Pageable pageable);

  User findByEmail(String email);

  User findByUsername(String username);
}
