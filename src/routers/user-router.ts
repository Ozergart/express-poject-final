import { Router } from "express";

import { userController } from "../controllers/user-controller";
import { accessMiddleware } from "../middlewares/accessMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { commonMiddleware } from "../middlewares/commonMiddleware";
import { userValidator } from "../validators/userValidator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateQuery(userValidator.queryGetUsers),
  userController.getList,
);
router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);
router.patch(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(userValidator.updateUser),
  userController.updateMe,
);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userController.getUserById,
);
router.delete(
  "/adminAccess/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  accessMiddleware.checkAdminAccess,
  userController.AdminDeleteUserById,
);

export const userRouter = router;
