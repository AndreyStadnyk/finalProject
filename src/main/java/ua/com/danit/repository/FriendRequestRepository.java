package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.FriendRequest;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, String> {

  public FriendRequest findFriendRequestByReceiverAndRequester(String receiver, String requester);

  public FriendRequest deleteFriendRequestByRequesterAndReceiver(String receiver, String requester);

  List<FriendRequest> findAllByReceiver(String receiver);
}
