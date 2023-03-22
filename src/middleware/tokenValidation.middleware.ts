import { NextFunction, Request, Response } from "express";
import "dotenv/config"
import jwt from "jsonwebtoken"

const tokenValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const is_token: string = req.headers.authorization

    if(!is_token){
        return res.status(401).json("user is not authenticated")

    }

    const token: string = is_token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {

        if(error){
            return res.status(401).json(error.message)
        }

        req.user = {
            id: decoded.sub
        }

        next()

    })

}

export default tokenValidationMiddleware