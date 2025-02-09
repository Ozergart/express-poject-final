import { orderByEnumPosts } from "../enums/orderByEnums";
import { orderEnum } from "../enums/orderEnum";
import { IUserResponse } from "./IUser";

export interface IPost {
  _id: string;
  userId: string;
  title: string;
  text: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPostWithoutUserId {
  _id: string;
  title: string;
  text: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPostCreate {
  userId: string;
  title: string;
  text: string;
}
export interface IPostUpdate {
  title?: string;
  text?: string;
}

export interface IPostResponseList {
  user: IUserResponse;
  posts: IPostWithoutUserId[];
  totalPages: number;
  page: number;
}
export type IPostListQuery = {
  page: number;
  postsForOnePage: number;
  search?: string;
  order: orderEnum;
  orderBy: orderByEnumPosts;
};
export interface IPostLike {
  _id: string;
  postId: string;
  userId: string;
}
export interface IPostLikeSearch {
  postId: string;
  userId: string;
}
