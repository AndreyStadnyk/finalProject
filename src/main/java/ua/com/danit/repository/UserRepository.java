package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.com.danit.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  User findByLastNameIgnoreCase(String firstName);
}
