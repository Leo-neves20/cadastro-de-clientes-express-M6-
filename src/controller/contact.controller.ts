import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import { iContacts } from "../interface/contacts.interface"
import { createContactService } from "../service/contact/createContact.service"
import { deleteContactService } from "../service/contact/deleteContact.service"
import { listContactsService } from "../service/contact/listContact.service"
import { updateContactService } from "../service/contact/updateContact.service"

export const createContactController = async (req: Request, res: Response) => {

    const response: iContacts = await createContactService(await req.body, req.user.id)

    return res.status(201).json(instanceToPlain(response))

}

export const listContactsController  = async (req: Request, res: Response) => {

    const response = await listContactsService(req.user.id)

    return res.status(200).json(instanceToPlain(response))
}

export const updateContactController = async (req: Request, res: Response) => {

    const response: iContacts = await updateContactService(req.params.id, await req.body)

    return res.status(200).json(response)

}

export const deleteContactController = async (req: Request, res: Response) => {

    const response: void = await deleteContactService(req.params.id)

    return res.status(204).json()
}