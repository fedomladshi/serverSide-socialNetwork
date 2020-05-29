import { Schema, model, Document } from "mongoose";

export interface IProfileSchema extends Document {
  user: any;
  song?: any;
  social: any;
  date: Date;
}

const ProfileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  song: [
    {
      name: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      lyrics: {
        type: String,
      },
      translation: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    instagram: {
      type: String,
    },
    vk: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model<IProfileSchema>("Profile", ProfileSchema);
