import { Request, Response } from "express"
import loginService from "../service/login/login.service"

export const loginController = async (req: Request, res: Response) => {

    const response: string = await loginService(req.body)

    return res.status(200).json({token: response})
    
}