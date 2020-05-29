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
    const user = await User.updateOne({ _id: id }, { status: newStatus });

    if (!user) {
      throw new Error("No such user");
    }
  };
}

export default UserService;
