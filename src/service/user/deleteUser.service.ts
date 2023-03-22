import appDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError.error";
import { iUser } from "../../interface/client.interface";

export const deleteUserService = async (idUser: string): Promise<void> => {

    const userRepository = appDataSource.getRepository(User);
  
    const is_user: iUser | null = await userRepository.findOneBy({ id: idUser });
  
    if (!is_user) {
      throw new AppError("user not found", 404);
    }
  
    await userRepository.delete({ id: idUser });

};