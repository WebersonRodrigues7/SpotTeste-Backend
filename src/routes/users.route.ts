import { Router } from "express";
import { UsersController } from "../controllers/users.controller.ts";
import { UsersService } from "../services/users/users.service.ts";

import { prisma } from "../lib/prisma.ts";
import { auth } from "../lib/auth.ts";
export const userRoute = Router();

const usersService = new UsersService(prisma, auth);
const usersController = new UsersController(usersService);

