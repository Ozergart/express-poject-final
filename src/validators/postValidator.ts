import joi from "joi";

import { orderByEnumPosts } from "../enums/orderByEnums";
import { orderEnum } from "../enums/orderEnum";

export class postValidator {
  private static title = joi.string().max(100);
  private static text = joi.string().max(3000);

  public static postCreate = joi.object({
    title: this.title.required(),
    text: this.text.required(),
  });
  public static postUpdate = joi.object({
    title: this.title,
    text: this.text,
  });
  public static queryGetPosts = joi.object({
    search: joi.string().trim(),
    page: joi.number().min(1).default(1),
    postsForOnePage: joi.number().min(1).max(200).default(20),
    order: joi
      .string()
      .valid(...Object.values(orderEnum))
      .default(orderEnum.DESC),
    orderBy: joi
      .string()
      .valid(...Object.values(orderByEnumPosts))
      .default(orderByEnumPosts.CREATED_AT),
  });
}
