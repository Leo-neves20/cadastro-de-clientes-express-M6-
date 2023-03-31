import appDataSource from "../data-source";
import User from "../entities/user.entity";

const pdfService = async (userId: string) => {

    const clientRepository = appDataSource.getRepository(User)

    const contact_list = await clientRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          contacts: true,
        },
    });

    const contacts_Arr = []

    contact_list.contacts.forEach(contact => {

        const arr = []

        arr.push(contact.name)
        arr.push(contact.email)
        arr.push(contact.phone_number)

        contacts_Arr.push(arr)

    })

    return contacts_Arr

}

export default pdfService