import User from "../models/user.model";
import mongoose from "mongoose";

class UserService {
  static getUsers = async (limit, skip, gender, userId) => {
    const users: any = await User.aggregate([
      {
        $unset: ["relationship"],
      },
      {
        $facet: {
          totalData: [
            {
              $match: {
                _id: { $ne: mongoose.Types.ObjectId(userId) },
                gender: { $in: [gender] },
              },
            },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [
            {
              $match: {
                _id: { $ne: mongoose.Types.ObjectId(userId) },
                gender: { $in: [gender] },
              },
            },
            { $count: "count" },
          ],
        },
      },
    ]);
    let pages = 0;
    if (users[0].totalCount[0]) {
      pages = Math.ceil(users[0].totalCount[0].count / limit);
    } else {
      pages = 1;
      users[0].totalCount[0] = 0;
      users[0].totalData = "No one user found";
    }

    console.log("fdsf", users[0]);

    if (!users[0]) {
      throw new Error("No one user found");
    }
    return {
      users: users[0].totalData,
      pages,
      usersAmount: users[0].totalCount[0].count,
    };
  };

  static deleteUser = async ({ id }) => {
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      throw new Error("No such user");
    }
  };
  static updateUserStatus = async ({ id }, status) => {
    const newStatus = status ? status : "set a status message";
    let user = await User.updateOne({ _id: id }, { status: newStatus });

    if (!user) {
      throw new Error("No such user");
    }
    user = await User.findById({ _id: id });

    return user;
  };

  static editUser = async (
    { id },
    { name, gender, relationship, hometown }
  ) => {
    let user = await User.findOneAndUpdate(
      { _id: id },
      { name, gender, relationship, hometown },
      { new: true }
    ).select("-password");

    if (!user) {
      throw new Error("No such user");
    }

    return user;
  };

  static updateUserAvatar = async (id, destination) => {
    return await User.findOneAndUpdate(
      { _id: id },
      { avatar: destination },
      { new: true }
    ).select("-_id avatar");
  };

  static deleteUserAvatar = async (id, destination) => {
    return await User.findOneAndUpdate(
      { _id: id },
      { avatar: destination },
      { new: true }
    ).select("-_id avatar");
  };

  static addFriend = async ({ id }, { friendUserId }) => {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $push: { friends: friendUserId } },
      { new: true }
    );
    return user.friends;
  };

  static removeFriend = async ({ id }, { friendUserId }) => {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { friends: friendUserId } },
      { new: true }
    );
    return user.friends;
  };

  static getFriends = async ({ id }) => {
    const user = await User.findOne({ _id: id }).populate("friends");
    if (!user) {
      throw new Error("You have no friends yet");
    }
    return user;
  };
}

export default UserService;
