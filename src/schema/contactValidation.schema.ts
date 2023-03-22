import * as yup from "yup"
import {SchemaOf} from "yup"
import { iContacts_request, iContacts_updata_request } from "../interface/contacts.interface"

export const contactValidationCreate: SchemaOf<iContacts_request> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string().required(),
})

export const contactValidationUpdate: SchemaOf<iContacts_updata_request> = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    phone_number: yup.string()
})