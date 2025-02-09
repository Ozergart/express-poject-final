import { Router } from "express";

import { postController } from "../controllers/post-controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { commonMiddleware } from "../middlewares/commonMiddleware";
import { postValidator } from "../validators/postValidator";

const router = Router();

router.post(
  "/:postId/like",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("postId"),
  postController.likePost,
);
router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(postValidator.postCreate),
  postController.create,
);
router.get(
  "/user/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.validateQuery(postValidator.queryGetPosts),
  postController.getPostsByUserId,
);
router.get(
  "/:postId",
  commonMiddleware.isIdValid("postId"),
  postController.getPostById,
);
router.delete(
  "/:postId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("postId"),
  postController.deleteMyPostById,
);
router.patch(
  "/:postId",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(postValidator.postUpdate),
  commonMiddleware.isIdValid("postId"),
  postController.updateMyPostById,
);

export const postRouter = router;
