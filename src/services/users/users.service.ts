import { PrismaClient } from "../../generated/prisma/client.ts";
import { userType } from "./users.schema.ts";
import { auth } from "../../lib/auth.ts";

export class UsersService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly authClient: typeof auth,
  ) {}
}
