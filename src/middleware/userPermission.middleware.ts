import { NextFunction, Request, Response } from "express";
import appDataSource from "../data-source";
import Contacts from "../entities/contacts.entities";
import { AppError } from "../error/appError.error";
import { iContacts } from "../interface/contacts.interface";

const clientPermissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const contactRepository = appDataSource.getRepository(Contacts)

    const is_contact = await contactRepository.findOneBy({id: +req.params.id})

    if(!is_contact){
        return res.status(404).json("Only who that created the contact is able to update or delete")

    }

    const contact_obj: iContacts | null = await contactRepository.createQueryBuilder("Contacts")
    .innerJoinAndSelect("Contacts.user", "user")
    .where("Contacts.id = :idContact", {idContact: req.params.id})
    .andWhere("user.id = :idUser", {idUser: req.user.id})
    .getOne()
    
    if(!contact_obj){
        return res.status(401).json("Only who that created the contact is able to update or delete")
    }

    next()
}

export default clientPermissionMiddleware