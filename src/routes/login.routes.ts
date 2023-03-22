import { Router } from "express";
import { loginController } from "../controller/login.controller";

const loginRoutes = Router()

loginRoutes.post("", loginController)

export default loginRoutes