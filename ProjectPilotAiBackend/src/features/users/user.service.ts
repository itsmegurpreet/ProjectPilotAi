import { AppError } from "@/common/errors/app-error";
import { userRepository } from "@/features/users/user.repository";

export const userService = {
  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  },
};
