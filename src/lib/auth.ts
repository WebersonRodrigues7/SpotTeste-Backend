import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.ts";
import { Resend } from "resend";
import { emailOTP } from "better-auth/plugins";
const resend = new Resend(process.env.RESEND_API_KEY);
export const auth = betterAuth({
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      sendVerificationOnSignUp: true,
      overrideDefaultEmailVerification: true,
      
      async sendVerificationOTP({ email, type, otp }) {
        if (type !== "email-verification" && type !== "sign-in") return;
        const { error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject:
            "Use esse codigo para conseguir validar seu acesso seu email",
          html: `<h2> Seu código é ${otp}</h2>
         <p> Expira em 5 minutos. </p>`,
        });

        if (error) throw error;
      },
    }),
  ],

  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),

  emailAndPassword: {
    requireEmailVerification: true,
    enabled: true,
  },
});
