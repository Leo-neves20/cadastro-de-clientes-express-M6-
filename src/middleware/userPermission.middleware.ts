import { NextFunction, Request, Response } from "express";
import appDataSource from "../data-source";
import Contacts from "../entities/contacts.entities";
import { AppError } from "../error/appError.error";
import { iContacts } from "../interface/contacts.interface";

const clientPermissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const contactRepository = appDataSource.getRepository(Contacts)

    const contact_obj: iContacts | null = await contactRepository.createQueryBuilder("Contacts")
    .innerJoinAndSelect("Contacts.user", "user")
    .where("Contacts.id = :idContact", {idContact: +req.params.id})
    .andWhere("user.id = :idUser", {idUser: req.user.id})
    .getOne()


    if(!contact_obj){
        throw new AppError("Only who that created the contact is able to update or delete", 401)
    }

    next()
}

export default clientPermissionMiddleware