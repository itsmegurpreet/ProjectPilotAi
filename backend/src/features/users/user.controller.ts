import { Request, Response } from "express";
import { userService } from "@/features/users/user.service";

export const userController = {
  async me(req: Request, res: Response) {
    const user = await userService.getProfile(req.user!.userId);
    return res.status(200).json({ success: true, data: user });
  },
};
