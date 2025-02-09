import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/IToket";
import { User } from "./userModel";

const tokenSchema = new Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  { timestamps: true, versionKey: false },
);

export const Tokens = model<IToken>("tokens", tokenSchema);
