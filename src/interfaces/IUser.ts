import { orderByEnum } from "../enums/orderByEnums";
import { orderEnum } from "../enums/orderEnum";
import { RoleEnum } from "../enums/user-role-enum";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  role: RoleEnum;
  phone: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type IUserListQuery = {
  page: number;
  usersForOnePage: number;
  search?: string;
  order: orderEnum;
  orderBy: orderByEnum;
};
export interface IUserCreate {
  name: string;
  email: string;
  age: number;
  password: string;
  role?: RoleEnum;
  phone: string;
}
export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserUpdate {
  name?: string;
  age?: number;
  email?: string;
  phone?: string;
}
export type IUserResponse = Pick<
  IUser,
  | "_id"
  | "name"
  | "email"
  | "age"
  | "role"
  | "phone"
  | "isVerified"
  | "createdAt"
  | "updatedAt"
>;
export type IUserShortResponse = Pick<
  IUser,
  "_id" | "name" | "age" | "createdAt"
>;
export interface IUserResponseList {
  users: IUserShortResponse[];
  totalPages: number;
  page: number;
}
