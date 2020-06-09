import Friendship from "../models/friendship.model";

class FriendshipService {
  static getAllFriendships = async () => {
    return await Friendship.find({}).populate("requester recipient");
  };
  static sendFriendRequest = async (loggedUserId, friendId) => {
    const friendship = new Friendship({
      requester: loggedUserId,
      recipient: friendId,
      status: "requested",
    });

    await friendship.save();
    return await Friendship.find({}).populate("requester recipient");
  };

  static cancelFriendRequest = async (loggedUserId, friendId) => {
    await Friendship.findOneAndDelete({
      requester: loggedUserId,
      recipient: friendId,
    });
  };

  static denyFriendRequest = async (loggedUserId, friendId) => {
     await Friendship.findOneAndDelete({
       requester: friendId,
       recipient: loggedUserId,
     });
   };

   static accetFriendRequest = async (loggedUserId, friendId) => {
     await Friendship.findOneAndDelete({
       requester: friendId,
       recipient: loggedUserId,
     });
   };
}
export default FriendshipService;
