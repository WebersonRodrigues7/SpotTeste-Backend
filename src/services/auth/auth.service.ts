import { auth } from "../../lib/auth.ts";
import { userType } from "../users/users.schema.ts";

export class AuthService {
  constructor(private readonly authClient: typeof auth) {}

  async signInEmail(data: userType) {
    return await this.authClient.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
      returnHeaders: true,
    });
  }

  async signUp(data: userType) {
    return await this.authClient.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      
    });
  }

  async signInOTP(data: userType) {
    return await this.authClient.api.signInEmailOTP({
      body: {
        email: data.email,
        otp: data.otp,
      },
      returnHeaders: true,
    });
  }

  async sendSignInOtp(data: userType) {
    return await this.authClient.api.sendVerificationOTP({
      body: {
        email: data.email,
        type: "sign-in",
      },
      
    });
  }

  async verifyEmailOTP(data: userType) {
    return await this.authClient.api.verifyEmailOTP({
      body: {
        email: data.email,
        otp: data.otp,
      },
      
    });
  }

  async sendOtp(data: userType){
    return await this.authClient.api.sendVerificationOTP({
      body: {
        email: data.email,
        type: 'email-verification'
      }
    })
  }
}
