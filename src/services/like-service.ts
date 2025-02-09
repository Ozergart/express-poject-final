import { IPostLike } from "../interfaces/IPost";
import { likeRepository } from "../repositories/like-repository";

class LikeService {
  public async like(userId: string, postId: string): Promise<void> {
    await likeRepository.create({ userId, postId });
  }
  public async likeDelete(userId: string, postId: string): Promise<void> {
    await likeRepository.delete({ userId, postId });
  }
  public async isPostLikedByUser(
    userId: string,
    postId: string,
  ): Promise<IPostLike> {
    return await likeRepository.findByParams({ userId, postId });
  }
}
export const likeService = new LikeService();
