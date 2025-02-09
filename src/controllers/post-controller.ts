import { NextFunction, Request, Response } from "express";

import { IPostListQuery, IPostUpdate } from "../interfaces/IPost";
import { postService } from "../services/post-service";

class PostController {
  public async getPostsByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.params.userId;
      const query = req.query as unknown as IPostListQuery;
      const result = await postService.getPostsByUserId(userId, query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.postId;
      const result = await postService.getPostById(postId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deleteMyPostById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.res.locals.tokenPayload.userId;
      const postId = req.params.postId;
      await postService.deleteMyPostById(userId, postId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async updateMyPostById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.res.locals.tokenPayload.userId;
      const dto = req.body as IPostUpdate;
      const postId = req.params.postId;
      const post = await postService.updateMyPostById(userId, postId, dto);
      res.json(post);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.tokenPayload.userId;
      const body = req.body;
      const dto = { ...body, userId };
      const result = await postService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const postController = new PostController();
