import { Schema, model, Document, Types } from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

export interface IUserSchema extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  status: string;
  gender: string;
  relationship: string;
  hometown: string;
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
    gender: {
      type: String,
      default: "None selected",
    },
    relationship: {
      type: String,
      default: "None selected",
    },
    hometown: {
      type: String
    },
    friends: [
      {type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
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
      email: user.email,
    },
  };
  return jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 7200 });
};

export default model<IUserSchema>("User", UserSchema);
