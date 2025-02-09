import { orderByEnumPosts } from "../enums/orderByEnums";
import { orderEnum } from "../enums/orderEnum";

export interface IPost {
  _id: string;
  userId: string;
  title: string;
  text: string;
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
  posts: IPost[];
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
