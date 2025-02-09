import { ApiError } from "../errors/api-error";
import {
  IPost,
  IPostCreate,
  IPostListQuery,
  IPostResponseList,
  IPostUpdate,
} from "../interfaces/IPost";
import { postRepository } from "../repositories/post-repository";

class PostService {
  public async getPostsByUserId(
    userId: string,
    query: IPostListQuery,
  ): Promise<IPostResponseList> {
    return await postRepository.getPostsByUserId(userId, query);
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
  public async create(dto: IPostCreate): Promise<IPost> {
    return await postRepository.create(dto);
  }
}
export const postService = new PostService();
