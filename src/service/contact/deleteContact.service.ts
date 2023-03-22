import appDataSource from "../../data-source"
import Contacts from "../../entities/contacts.entities"
import { AppError } from "../../error/appError.error"
import { iContacts } from "../../interface/contacts.interface"

export const deleteContactService = async (idContact: string): Promise<void> => {

    const contactRepository = appDataSource.getRepository(Contacts)

    const is_contact: iContacts | null = await contactRepository.findOneBy({id: +idContact})

    if(!is_contact){
        throw new AppError("contact not found", 404)
    }

    await contactRepository.delete({id: +idContact})

}