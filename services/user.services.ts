import User from "../models/user.model";

class UserService {
  static getUsers = async () => {
    const users = await User.find().select("-password");
    if (!users) {
      throw new Error("No one user found");
    }
    return users;
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

  static updateUserAvatar = async (id, destination) => {
    return await User.findOneAndUpdate({ _id: id }, { avatar: destination }, { new: true }).select("-_id avatar");
  };

  static deleteUserAvatar = async (id, destination) => {
    return await User.findOneAndUpdate({ _id: id }, { avatar: destination }, { new: true }).select("-_id avatar");
  };
}

export default UserService;
