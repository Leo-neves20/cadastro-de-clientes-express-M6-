import appDataSource from "../../data-source"
import Contacts from "../../entities/contacts.entities"
import { AppError } from "../../error/appError.error"
import { iContacts, iContacts_updata_request } from "../../interface/contacts.interface"

export const updateContactService = async (
    idContact: string, dataContact: iContacts_updata_request
) => {
    
    const contactRepository = appDataSource.getRepository(Contacts)

    const is_contact: iContacts | null = await contactRepository.findOneBy({id: +idContact})

    if(!is_contact){
        throw new AppError("contact not found", 404)
    }

    await contactRepository.update(+idContact, {
        ...is_contact, ...dataContact
    })

    const updatedContact: iContacts = await contactRepository.findOneBy({id: +idContact})

    return updatedContact

}