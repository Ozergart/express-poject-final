import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/IToket";
import { IUserCreate, IUserLogin } from "../interfaces/IUser";
import { authService } from "../services/auth-service";

class AuthController {
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserLogin;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async logOutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.tokenPayload.userId;
      await authService.logOutAll(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenId = req.res.locals.tokenId;
      await authService.logOut(tokenId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserCreate;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.res.locals.tokens.refreshToken as string;
      const payload = req.res.locals.tokenPayload as ITokenPayload;
      const result = await authService.refresh(refreshToken, payload);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
