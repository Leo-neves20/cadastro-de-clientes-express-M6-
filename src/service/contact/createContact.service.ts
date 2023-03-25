import appDataSource from "../../data-source";
import Contacts from "../../entities/contacts.entities";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError.error";
import { iUser } from "../../interface/user.interface";
import {
  iContacts,
  iContacts_request,
} from "../../interface/contacts.interface";

export const createContactService = async (
  data: iContacts_request,
  userId: string
): Promise<iContacts> => {

  const contactRepository = appDataSource.getRepository(Contacts);
  const userRepository = appDataSource.getRepository(User);

  const user: iUser = await userRepository.findOneBy({ id: userId });

  const is_contact = await contactRepository
    .createQueryBuilder("Contacts")
    .innerJoinAndSelect("Contacts.user", "user")
    .where("Contacts.email = :emailContact", {
      emailContact: data.email,
    })
    .andWhere("user.id = :idUser", { idUser: userId })
    .getOne();

  if (is_contact) {
    throw new AppError("contact already registred with the same email");
  }

  const createContact = contactRepository.create({ ...data, user: user });
  const saveContact: iContacts = await contactRepository.save(createContact);

  return saveContact;
};
