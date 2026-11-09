import { Request, Response } from "express";
import { AuthService } from "../services/auth/auth.service.ts";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signIn(req: Request, res: Response) {
    try {
      const { headers, response } = await this.authService.signInEmail(
        req.body,
      );

      const cookies = headers.getSetCookie();

      if (cookies.length > 0) {
        res.setHeader("Set-Cookie", cookies);
      }

      res.status(200).json(response);
    } catch (err) {
      res.status(401).json({
        message: "Email ou senha inválido(s)!",
      });
    }
  }

  async signInOTP(req: Request, res: Response) {
    try {
      const { headers, response } = await this.authService.signInOTP(req.body);

      const cookies = headers.getSetCookie();

      if (cookies.length > 0) {
        res.setHeader("Set-Cookie", cookies);
      }

      res.status(200).json(response);
    } catch (err) {
      res.status(401).json({
        message: "Código ou email inválido(s)!",
      });
    }
  }

  async signUp(req: Request, res: Response) {
    try {
      const signUp = await this.authService.signUp(req.body);
      res.status(200).json(signUp);
    } catch (err) {
      res.status(409).json({
        message: "Conta ja existente ou dados inválidos!",
      });
    }
  }

  async sendSignInOtp(req: Request, res: Response) {
    try {
      const sendVerify = await this.authService.sendSignInOtp(req.body);

      res.status(200).json(sendVerify);
    } catch (err) {
      res.status(400).json({
        message: "Erro ao enviar código",
      });
    }
  }

  async verifyEmailOtp(req: Request, res: Response) {
    try {
      const sendVerify = await this.authService.verifyEmailOTP(req.body);

      res.status(200).json(sendVerify);
    } catch (err) {
      res.status(400).json({
        message: "Erro ao verificar email!",
      });
    }
  }

  async sendVerificationOtp(req: Request, res: Response) {
    try {
      const verifyOtp = await this.authService.sendOtp(req.body);

      res.status(200).json(verifyOtp);
    } catch (err) {
      res.status(400).json({
        message: "Erro ao enviar código",
      });
    }
  }
}
