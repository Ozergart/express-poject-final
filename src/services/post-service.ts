import { ApiError } from "../errors/api-error";
import {
  IPost,
  IPostCreate,
  IPostListQuery,
  IPostUpdate,
} from "../interfaces/IPost";
import { IUser } from "../interfaces/IUser";
import { postRepository } from "../repositories/post-repository";
import { userRepository } from "../repositories/user-repository";
import { likeService } from "./like-service";

class PostService {
  public async getPostsByUserId(
    userId: string,
    query: IPostListQuery,
  ): Promise<{
    user: IUser;
    posts: IPost[];
    totalPages: number;
    page: number;
  }> {
    const user = await userRepository.getById(userId);
    const list = await postRepository.getPostsByUserId(userId, query);
    return { user, ...list };
  }
  public async getPostById(userId: string): Promise<IPost> {
    const post = await postRepository.getPostById(userId);
    if (!post) {
      throw new ApiError("post not found", 404);
    }
    return post;
  }
  public async deleteMyPostById(userId: string, postId: string): Promise<void> {
    const post = await postRepository.getPostById(postId);
    if (!post) {
      throw new ApiError("post not found", 404);
    }
    if (post.userId != userId) {
      throw new ApiError("access denied, its not your post", 403);
    }
    await postRepository.deletePostById(postId);
  }
  public async updateMyPostById(
    userId: string,
    postId: string,
    dto: IPostUpdate,
  ): Promise<IPost> {
    const post = await postRepository.getPostById(postId);
    if (!post) {
      throw new ApiError("post not found", 404);
    }
    if (post.userId != userId) {
      throw new ApiError("access denied, its not your post", 403);
    }
    return await postRepository.updatePostById(postId, dto);
  }
  public async likePost(userId: string, postId: string): Promise<IPost> {
    const post = await postRepository.getPostById(postId);
    if (!post) {
      throw new ApiError("post not found", 404);
    }
    const existingLike = await likeService.isPostLikedByUser(userId, postId);
    if (existingLike) {
      await likeService.likeDelete(userId, postId);
      return await postRepository.removeLikePost(postId);
    } else {
      await likeService.like(userId, postId);
      return await postRepository.likePost(postId);
    }
  }
  public async create(dto: IPostCreate): Promise<IPost> {
    return await postRepository.create(dto);
  }
}
export const postService = new PostService();
