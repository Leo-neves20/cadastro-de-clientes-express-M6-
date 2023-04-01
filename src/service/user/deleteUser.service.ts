import appDataSource from "../../data-source";
import Contacts from "../../entities/contacts.entities";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError.error";
import { iUser } from "../../interface/user.interface";

export const deleteUserService = async (idUser: string): Promise<void> => {

  const userRepository = appDataSource.getRepository(User); 
  const contactRepository = appDataSource.getRepository(Contacts)

  const is_user = await userRepository.findOne({
    where: {
      id: idUser,
    },
    relations: {
      contacts: true,
    },
  });

  if (!is_user) {
    throw new AppError("user not found", 404);
  }

  is_user.contacts.forEach(async (contact) => {

    await contactRepository.delete({id: contact.id})

  })


  await userRepository.delete({ id: idUser });
  
};