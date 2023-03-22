import { hashSync } from "bcrypt";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError.error";
import appDataSource from "../../data-source";
import { iUser, iUser_create_request } from "../../interface/user.interface";

export const createUserService = async (
  data: iUser_create_request
): Promise<iUser> => {
  const userRepository = appDataSource.getRepository(User);

  const is_user: iUser | null = await userRepository.findOneBy({
    email: data.email,
  });

  if (is_user) {
    throw new AppError("Email already registred in other account");
  }

  data.password = hashSync(data.password, 10);

  const create_user = userRepository.create(data);
  const user = await userRepository.save(create_user);

  return user;
};
