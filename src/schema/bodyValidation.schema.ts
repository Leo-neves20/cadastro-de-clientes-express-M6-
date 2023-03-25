import { NextFunction, Request, Response } from "express"
import {AnySchema} from "yup"

const validatedBody = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validate = await schema.validate(req.body,{
            stripUnknown: true,
            abortEarly: true
        })

        req.body = validate

        next() 

    } catch (error) {

        return res.status(400).json({error: error})
        
    }
}

export default validatedBody