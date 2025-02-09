import { FilterQuery } from "mongoose";

import {
  IPost,
  IPostCreate,
  IPostListQuery,
  IPostUpdate,
} from "../interfaces/IPost";
import { Posts } from "../models/postModel";

class PostRepository {
  public async getPostsByUserId(
    userId: string,
    query: IPostListQuery,
  ): Promise<{
    posts: IPost[];
    totalPages: number;
    page: number;
  }> {
    const page = +query.page;
    const postsForOnePage = +query.postsForOnePage;
    const skip = (page - 1) * postsForOnePage;

    const sortOrder: 1 | -1 = query.order === "asc" ? 1 : -1;
    const sortObj = { [query.orderBy]: sortOrder };

    const filterObj: FilterQuery<IPost> = { userId };
    if (query.search) {
      filterObj.$and = [
        { userId },
        { title: { $regex: query.search, $options: "i" } },
      ];
    }
    const totalDocuments = await Posts.countDocuments(filterObj);
    const totalPages = Math.ceil(totalDocuments / postsForOnePage);

    const posts = await Posts.find(filterObj)
      .sort(sortObj)
      .limit(postsForOnePage)
      .skip(skip);
    return { posts, totalPages, page };
  }
  public async create(dto: IPostCreate): Promise<IPost> {
    return await Posts.create(dto);
  }
  public async getPostById(postId: string): Promise<IPost> {
    return await Posts.findById(postId);
  }
  public async deletePostById(postId: string): Promise<void> {
    await Posts.findByIdAndDelete(postId);
  }
  public async updatePostById(
    postId: string,
    dto: IPostUpdate,
  ): Promise<IPost> {
    return await Posts.findByIdAndUpdate(postId, dto, { new: true });
  }
  public async likePost(postId: string) {
    const post = await Posts.findById(postId);
    const likes = post.likes;
    return await Posts.findByIdAndUpdate(
      postId,
      { likes: likes + 1 },
      { new: true },
    );
  }
  public async removeLikePost(postId: string) {
    const post = await Posts.findById(postId);
    const likes = post.likes;
    return await Posts.findByIdAndUpdate(
      postId,
      { likes: likes - 1 },
      { new: true },
    );
  }
}
export const postRepository = new PostRepository();
