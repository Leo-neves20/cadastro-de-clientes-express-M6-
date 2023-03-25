import { Router } from "express";
import { loginController } from "../controller/login.controller";
import validatedBody from "../schema/bodyValidation.schema";
import { loginValidation } from "../schema/loginValidation.schema";

const loginRoutes = Router()

loginRoutes.post("",
    validatedBody(loginValidation),
    loginController
)

export default loginRoutes