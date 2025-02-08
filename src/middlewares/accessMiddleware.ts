import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/user-role-enum";
import { ApiError } from "../errors/api-error";

class AccessMiddleware {
  public async checkAdminAccess(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const payload = req.res.locals.tokenPayload;
      if (!payload) {
        throw new ApiError("access error", 403);
      }
      if (payload.role != RoleEnum.ADMIN) {
        throw new ApiError("access forbidden", 403);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const accessMiddleware = new AccessMiddleware();
