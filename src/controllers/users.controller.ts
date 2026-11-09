import { Request, Response } from "express";
import { userType } from "../services/users/users.schema.ts";
import { UsersService } from "../services/users/users.service.ts";

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async POST(req: Request, res: Response) {
  
  }
}
