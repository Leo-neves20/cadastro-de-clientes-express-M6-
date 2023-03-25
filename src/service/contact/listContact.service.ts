import appDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { iUser } from "../../interface/user.interface";

export const listContactsService = async (userId: string): Promise<iUser> => {

  const clientRepository = appDataSource.getRepository(User);

  const contact_list: iUser = await clientRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  return contact_list;
  
};
