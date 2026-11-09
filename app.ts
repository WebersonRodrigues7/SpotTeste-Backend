import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/lib/auth.ts";
import { userRoute } from "./src/routes/users.route.ts";
import { authRouter } from "./src/routes/auth.route.ts";
import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/users", userRoute);

app.use("/auth", authRouter);

app.listen(3001);
