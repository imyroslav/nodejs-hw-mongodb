import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema } from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";
import { loginUserSchema } from "../validation/auth.js";
import { loginUserController } from "../controllers/auth.js";
import { logoutUserController } from "../controllers/auth.js";
import { sendResetEmailSchema } from "../validation/auth.js"
import { sendResetEmailController } from "../controllers/auth.js"
import { refreshUserSessionController } from "../controllers/auth.js";
import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';


const router = Router();

// **************** User register *****************
router.post(
  "/register",
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

// *************** User login ****************
router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

// ***************** User logout ***************
router.post("/logout", ctrlWrapper(logoutUserController));


// **************** Rest password email ***********
router.post("/send-reset-email", validateBody(sendResetEmailSchema),
ctrlWrapper(sendResetEmailController))

// ************* Password reset ******************
router.post(
  "/reset-password",
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);



// ************** Session refresh **************
router.post("/refresh", ctrlWrapper(refreshUserSessionController));

export default router;