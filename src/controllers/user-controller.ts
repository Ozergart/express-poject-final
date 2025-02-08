import { NextFunction, Request, Response } from "express";

import { IUserListQuery, IUserUpdate } from "../interfaces/IUser";
import { userPresenter } from "../presenters/userPresenter";
import { userService } from "../services/user-service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IUserListQuery;
      const { users, totalPages, page } = await userService.getList(query);
      const result = userPresenter.toResponseList(users, totalPages, page);
      res.json(result).status(201);
    } catch (e) {
      next(e);
    }
  }
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const user = await userService.getUserById(userId);
      const result = userPresenter.toResponse(user);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async AdminDeleteUserById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.params.userId;
      await userService.AdminDeleteUserById(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.tokenPayload.userId;
      const user = await userService.getMe(userId);
      const result = userPresenter.toResponse(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.tokenPayload.userId;
      await userService.deleteMe(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.res.locals.tokenPayload.userId;
      const dto = req.body as IUserUpdate;
      const user = await userService.updateMe(userId, dto);
      const result = userPresenter.toResponse(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
