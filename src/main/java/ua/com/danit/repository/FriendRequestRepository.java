package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.FriendRequest;
import ua.com.danit.entity.User;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

  public void deleteById(long id);

  List<FriendRequest> findAllByReceiver(User receiver);
}
