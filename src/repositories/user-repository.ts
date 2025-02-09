import { FilterQuery } from "mongoose";

import { RoleEnum } from "../enums/user-role-enum";
import {
  IUser,
  IUserCreate,
  IUserListQuery,
  IUserUpdate,
} from "../interfaces/IUser";
import { User } from "../models/userModel";

class UserRepository {
  public async getList(query: IUserListQuery): Promise<{
    users: IUser[];
    totalPages: number;
    page: number;
  }> {
    const page = +query.page;
    const usersForOnePage = +query.usersForOnePage;
    const skip = (page - 1) * usersForOnePage;

    const sortOrder: 1 | -1 = query.order === "asc" ? 1 : -1;
    const sortObj = { [query.orderBy]: sortOrder };

    const filterObj: FilterQuery<IUser> = {};
    if (query.search) {
      filterObj.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];
    }
    const totalDocuments = await User.countDocuments(filterObj);
    const totalPages = Math.ceil(totalDocuments / usersForOnePage);

    const users = await User.find(filterObj)
      .sort(sortObj)
      .limit(usersForOnePage)
      .skip(skip);
    return { users, totalPages, page };
  }
  public async create(dto: IUserCreate): Promise<IUser> {
    return await User.create(dto);
  }
  public async updateById(id: string, dto: IUserUpdate): Promise<IUser> {
    return await User.findByIdAndUpdate(id, dto, { returnDocument: "after" });
  }
  public async AdminSetRole(id: string, role: RoleEnum): Promise<IUser> {
    return await User.findByIdAndUpdate(
      id,
      { role },
      { returnDocument: "after" },
    );
  }
  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }
  public async getById(id: string): Promise<IUser> {
    return await User.findById(id);
  }
  public async deleteById(id: string): Promise<IUser> {
    return await User.findByIdAndDelete(id);
  }
}
export const userRepository = new UserRepository();
