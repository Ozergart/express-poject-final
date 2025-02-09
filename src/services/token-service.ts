import * as jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { TokenTypeEnum } from "../enums/tokenTypeEnum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/IToket";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const AccessExpiresIn = "1h";
    const RefreshExpiresIn = "2w";
    // const aexpires = config.ACCESS_TOKEN_EXPIRES_IN;
    // const rexpires = config.REFRESH_TOKEN_EXPIRES_IN;
    const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
      expiresIn: AccessExpiresIn,
    });
    const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
      expiresIn: RefreshExpiresIn,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  public checkToken(token: string, tokenType: TokenTypeEnum) {
    try {
      let secretKey = "";
      switch (tokenType) {
        case TokenTypeEnum.access:
          secretKey = config.ACCESS_TOKEN_SECRET;
          break;
        case TokenTypeEnum.refresh:
          secretKey = config.REFRESH_TOKEN_SECRET;
          break;
        default:
          throw new ApiError("Invalid token type", 401);
      }
      return jwt.verify(token, secretKey) as ITokenPayload;
    } catch (e) {
      console.error(e.message);
      throw new ApiError("invalid token", 401);
    }
  }
}

export const tokenService = new TokenService();
