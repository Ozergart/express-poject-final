import { model, Schema } from "mongoose";

import { IPost } from "../interfaces/IPost";
import { User } from "./userModel";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  { timestamps: true, versionKey: false },
);

export const Posts = model<IPost>("posts", postSchema);
