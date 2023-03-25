import * as yup from "yup"
import {SchemaOf} from "yup"
import { iUser_create_request, iUser_update_request } from "../interface/user.interface"

export const userValidationCreate: SchemaOf<iUser_create_request> = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email().required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
    phone_number: yup.string().required("Phone number is a required field")
})

export const userValidationUpdate: SchemaOf<iUser_update_request> = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
    phone_number: yup.string()
})
