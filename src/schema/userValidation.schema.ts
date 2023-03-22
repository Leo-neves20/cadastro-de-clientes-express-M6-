import * as yup from "yup"
import {SchemaOf} from "yup"
import { iUser_create_request, iUser_update } from "../interface/user.interface"

export const userValidationCreate: SchemaOf<iUser_create_request> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone_number: yup.string().required()
})

export const userValidationUpdate: SchemaOf<iUser_update> = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
    phone_number: yup.string()
})
