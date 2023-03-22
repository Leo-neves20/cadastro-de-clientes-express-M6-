import { hashSync } from "bcrypt";
import appDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError.error";
import { iUser, iUser_update } from "../../interface/client.interface";

export const updateUserService = async (
    idUser: string,
    data: iUser_update
): Promise<iUser> => {

    const clientRepository = appDataSource.getRepository(User);
  
    const is_user: iUser | null = await clientRepository.findOneBy({ id: idUser });
  
    if (!is_user) {
      throw new AppError("user not found", 404);
    }
  
    if ("password" in data) {
      data.password = hashSync(data.password, 10);
    }
  
    if ("email" in data) {

      const is_user: iUser | null = await clientRepository.findOneBy({ email: data.email });
  
      if (is_user) {
        throw new AppError("Email already registred in other account");
      }

    }
  
    await clientRepository.update(idUser, { ...is_user, ...data });
  
    const user: iUser = await clientRepository.findOneBy({ id: idUser });
  
    return user;

  };