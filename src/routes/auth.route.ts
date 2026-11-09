import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.ts";
import { AuthService } from "../services/auth/auth.service.ts";
import { auth } from "../lib/auth.ts";

export const authRouter = Router();
const authService = new AuthService(auth);
const authController = new AuthController(authService);

authRouter.post("/signin", (req, res) => authController.signIn(req, res));

authRouter.post("/signup", (req, res) => authController.signUp(req, res));

authRouter.post("/signin-otp", (req, res) =>
  authController.signInOTP(req, res),
);

authRouter.post("/send-otp", (req, res) =>
  authController.sendSignInOtp(req, res),
);

authRouter.post("/verify-email", (req, res) =>
  authController.verifyEmailOtp(req, res),
);

authRouter.post('/send-verify-otp', (req, res) =>  authController.sendVerificationOtp(req, res))