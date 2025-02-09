import { model, Schema } from "mongoose";

import { IPostLike } from "../interfaces/IPost";
import { Posts } from "./postModel";
import { User } from "./userModel";

const postLikeSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, required: true, ref: Posts },
    userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  { timestamps: false, versionKey: false },
);

export const Likes = model<IPostLike>("likes", postLikeSchema);
