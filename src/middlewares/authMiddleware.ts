import { NextFunction, Request, Response } from "express";

import { TokenTypeEnum } from "../enums/tokenTypeEnum";
import { ApiError } from "../errors/api-error";
import { tokenRepository } from "../repositories/token-repository";
import { tokenService } from "../services/token-service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        throw new ApiError("No token", 401);
      }
      const accessToken = authorization.split("Bearer ")[1];
      if (!accessToken) {
        throw new ApiError("No token", 401);
      }
      const payload = tokenService.checkToken(
        accessToken,
        TokenTypeEnum.access,
      );
      const tokens = await tokenRepository.findOneByParams({ accessToken });
      if (!tokens) {
        throw new ApiError("Invalid token", 401);
      }
      req.res.locals.tokenId = tokens._id;
      req.res.locals.tokenPayload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        throw new ApiError("No token", 401);
      }
      const refreshToken = authorization.split("Bearer ")[1];
      if (!refreshToken) {
        throw new ApiError("No token", 401);
      }
      const payload = tokenService.checkToken(
        refreshToken,
        TokenTypeEnum.refresh,
      );
      const tokens = await tokenRepository.findOneByParams({ refreshToken });
      if (!tokens) {
        throw new ApiError("Invalid token", 401);
      }
      req.res.locals.tokens = tokens;
      req.res.locals.tokenPayload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
