import joi from "joi";

import { regexConstants } from "../constants/regexConstants";
import { orderByEnum } from "../enums/orderByEnums";
import { orderEnum } from "../enums/orderEnum";
import { RoleEnum } from "../enums/user-role-enum";

export class userValidator {
  private static name = joi.string().min(3).max(50).trim();
  private static age = joi.number().min(18).max(200);
  private static email = joi.string().regex(regexConstants.EMAIL).trim();
  private static password = joi.string().regex(regexConstants.PASSWORD).trim();
  private static phone = joi.string().regex(regexConstants.PHONE).trim();
  private static role = joi.string().valid(...Object.values(RoleEnum));

  public static changeRole = joi.object({
    role: this.role.required(),
  });
  public static userLogin = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
  public static createUser = joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone.required(),
  });
  public static updateUser = joi.object({
    name: this.name,
    age: this.age,
    email: this.email,
    phone: this.phone,
  });
  public static queryGetUsers = joi.object({
    search: joi.string().trim(),
    page: joi.number().min(1).default(1),
    usersForOnePage: joi.number().min(1).max(100).default(20),
    order: joi
      .string()
      .valid(...Object.values(orderEnum))
      .default(orderEnum.ASC),
    orderBy: joi
      .string()
      .valid(...Object.values(orderByEnum))
      .default(orderByEnum.CREATED_AT),
  });
}
