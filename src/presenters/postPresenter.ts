import {
  IPost,
  IPostResponseList,
  IPostWithoutUserId,
} from "../interfaces/IPost";
import { IUser } from "../interfaces/IUser";
import { userPresenter } from "./userPresenter";

class PostPresenter {
  public withoutUserId(post: IPost): IPostWithoutUserId {
    return {
      _id: post._id,
      title: post.title,
      text: post.text,
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
  public toResponseList(
    user: IUser,
    posts: IPost[],
    totalPages: number,
    page: number,
  ): IPostResponseList {
    return {
      user: userPresenter.toResponse(user),
      posts: posts.map(this.withoutUserId),
      totalPages,
      page,
    };
  }
}

export const postPresenter = new PostPresenter();
