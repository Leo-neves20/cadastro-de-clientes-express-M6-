import appDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUser } from "../../interface/user.interface";

export const listUsersService = async (): Promise<iUser[]> => {

  const userRepository = appDataSource.getRepository(User);

  const is_user: iUser[] = await userRepository.find();

  return is_user;
  
};