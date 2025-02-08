import { ApiError } from "../errors/api-error";
import { IUser, IUserListQuery, IUserUpdate } from "../interfaces/IUser";
import { userRepository } from "../repositories/user-repository";
import { authService } from "./auth-service";

class UserService {
  public async getList(query: IUserListQuery): Promise<{
    users: IUser[];
    totalPages: number;
    page: number;
  }> {
    return await userRepository.getList(query);
  }
  public async getUserById(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }
  public async getMe(id: string): Promise<IUser> {
    return await userRepository.getById(id);
  }
  public async AdminDeleteUserById(id: string): Promise<void> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    await userRepository.deleteById(id);
    await authService.logOutAll(id);
  }
  public async deleteMe(id: string): Promise<void> {
    await userRepository.deleteById(id);
    await authService.logOutAll(id);
  }
  public async updateMe(id: string, data: IUserUpdate): Promise<IUser> {
    return await userRepository.updateById(id, data);
  }
  public async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email is not unique", 409);
    }
  }
}
export const userService = new UserService();
