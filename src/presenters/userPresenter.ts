import {
  IUser,
  IUserResponse,
  IUserResponseList,
  IUserShortResponse,
} from "../interfaces/IUser";

class UserPresenter {
  public toResponse(entity: IUser): IUserResponse {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      role: entity.role,
      phone: entity.phone,
      isVerified: entity.isVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public toShortResponse(entity: IUser): IUserShortResponse {
    return {
      _id: entity._id,
      name: entity.name,
      age: entity.age,
      createdAt: entity.createdAt,
    };
  }

  public toResponseList(
    entities: IUser[],
    totalPages: number,
    page: number,
  ): IUserResponseList {
    return {
      users: entities.map(this.toShortResponse),
      totalPages,
      page,
    };
  }
}

export const userPresenter = new UserPresenter();
