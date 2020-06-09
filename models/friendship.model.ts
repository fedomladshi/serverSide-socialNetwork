import { Schema, model, Document, Types } from "mongoose";

export interface IFriendshipSchema extends Document {
  requester: string;
  requestTo: string;
  status: string;
}

const FriendRequestSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    required: true,
  },
});

export default model<IFriendshipSchema>("Friendship", FriendRequestSchema );
