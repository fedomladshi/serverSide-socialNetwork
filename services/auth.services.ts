import User from "../models/user.model";
import bcrypt from "bcryptjs";

class AuthService {
  static registration = async ({ name, email, password }) => {
    let user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    user.JWTSign();
  };

  static login = async ({ name, email, password }) => {
    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }
    const token = user.JWTSign();
    return {
      token,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        gender: user.gender,
        relationship: user.relationship,
        hometown: user.hometown,
        status: user.status,
        friends: user.friends,
        createdAt: user.createdAt,
      },
    };
  };
  static getUserById = async ({ id }) => {
    return await User.findById(id).select("-password");
  };
}

export default AuthService;
