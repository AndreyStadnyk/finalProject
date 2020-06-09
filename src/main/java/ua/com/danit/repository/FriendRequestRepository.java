package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.FriendRequest;
import ua.com.danit.entity.User;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, String> {
  public FriendRequest findFriendRequestByReceiverAndRequester(User receiver, User requester);
  public FriendRequest deleteFriendRequestByRequesterAndReceiver(User receiver, User requester);
}
