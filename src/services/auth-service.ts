import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/IToket";
import { IUser, IUserCreate, IUserLogin } from "../interfaces/IUser";
import { tokenRepository } from "../repositories/token-repository";
import { userRepository } from "../repositories/user-repository";
import { passwordService } from "./password-service";
import { tokenService } from "./token-service";
import { userService } from "./user-service";

class AuthService {
  public async signIn(
    dto: IUserLogin,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("Incorrect email or password", 401);
    }
    const isPassTrue = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPassTrue) {
      throw new ApiError("Incorrect email or password", 401);
    }
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });

    await tokenRepository.create({ ...tokens, userId: user._id });
    return { user, tokens };
  }
  public async logOutAll(userId: string): Promise<void> {
    await tokenRepository.deleteByParams({ userId });
  }
  public async logOut(tokenId: string): Promise<void> {
    await tokenRepository.deleteOneByParams({ _id: tokenId });
  }
  public async signUp(
    dto: IUserCreate,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await userService.isEmailUnique(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, userId: user._id });
    return { user, tokens };
  }
  public async refresh(
    refreshToken: string,
    payload: ITokenPayload,
  ): Promise<ITokenPair> {
    await tokenRepository.deleteOneByParams({ refreshToken });
    const tokens = tokenService.generateTokens({
      userId: payload.userId,
      role: payload.role,
    });
    await tokenRepository.create({ ...tokens, userId: payload.userId });
    return tokens;
  }
}
export const authService = new AuthService();
