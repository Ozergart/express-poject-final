import { RoleEnum } from "../enums/user-role-enum";

export interface ITokenPayload {
  userId: string;
  role: RoleEnum;
}
export interface IToken {
  _id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ITokenDTO {
  userId: string;
  accessToken: string;
  refreshToken: string;
}
export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
