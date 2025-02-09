import { IPostLike, IPostLikeSearch } from "../interfaces/IPost";
import { Likes } from "../models/postLikeModel";

class LikeRepository {
  public async findByParams(params: IPostLikeSearch): Promise<IPostLike> {
    return await Likes.findOne(params);
  }
  public async create(dto: IPostLikeSearch): Promise<void> {
    await Likes.create(dto);
  }
  public async delete(dto: IPostLikeSearch): Promise<void> {
    await Likes.deleteOne(dto);
  }
}
export const likeRepository = new LikeRepository();
