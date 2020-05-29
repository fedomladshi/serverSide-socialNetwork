import { Schema, model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

export interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  status: string;
  createdAt: string;
  JWTSign: () => string;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "./uploads/defaults/defaultAvatar.jpg",
    },
    status: {
      type: String,
      default: "set a status message",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.JWTSign = function () {
  const user = this as IUserSchema;
  const payload = {
    user: {
      id: user.id,
    },
  };
  return jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 7200 });
};

export default model<IUserSchema>("User", UserSchema);
