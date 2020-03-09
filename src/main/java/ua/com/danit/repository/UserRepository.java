package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.com.danit.entity.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
  User findByLastNameIgnoreCase(String firstName);
//  List<User> findByFirstNameOrLastNameLikeIgnoreCase(String queryStrFirstName, String queryStrLastName);
  List<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String queryStrFirstName, String queryStrLastName);
}
