import { Router } from "express";

import { authController } from "../controllers/auth-controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { commonMiddleware } from "../middlewares/commonMiddleware";
import { userValidator } from "../validators/userValidator";

const router = Router();

router.post(
  "/signUp",
  commonMiddleware.validateBody(userValidator.createUser),
  authController.signUp,
);
router.delete(
  "/me/logOut",
  authMiddleware.checkAccessToken,
  authController.logOut,
);
router.delete(
  "/me/logOut/all",
  authMiddleware.checkAccessToken,
  authController.logOutAll,
);
router.post(
  "/signIn",
  commonMiddleware.validateBody(userValidator.userLogin),
  authController.signIn,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

export const authRouter = router;
