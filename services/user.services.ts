import User from "../models/user.model";
import mongoose from "mongoose";

class UserService {
  static getUsers = async (limit, skip, gender, userId) => {
    const users: any = await User.aggregate([
      {
        $unset: ["relationship"],
      },
      {
        $match: {
          _id: { $ne: mongoose.Types.ObjectId(userId) },
          gender: { $in: [gender] },
        },
      },
      {
        $facet: {
          totalRecords: [
            {
              $count: "total",
            },
          ],
          data: [
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
    ])

    const pages = Math.ceil(users[0].totalRecords[0].total / limit);
    if (!users) {
      throw new Error("No one user found");
    }
    return {
      users: users[0].data,
      pages,
      usersAmount: users[0].totalRecords[0].total,
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
}

export default UserService;
