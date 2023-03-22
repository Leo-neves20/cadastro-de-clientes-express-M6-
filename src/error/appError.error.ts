import { Request, Response, NextFunction } from "express"

export class AppError extends Error{

    statusCode: number

    constructor(message: string, statusCode: number = 400){
        super()
        this.message = message,
        this.statusCode = statusCode
    }

}

export const handleError = (error: Error, req: Request, res: Response, next: NextFunction) => {

    if(error instanceof AppError){
        return res.status(error.statusCode).json(error.message)
    }

    console.log(error)

    return res.status(500).json("internal server error")

}

