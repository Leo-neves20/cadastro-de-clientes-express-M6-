import { compare } from "bcrypt"
import appDataSource from "../../data-source"
import User from "../../entities/user.entity"
import { AppError } from "../../error/appError.error"
import { iLogin } from "../../interface/login.interface"
import jwt from  "jsonwebtoken"
import { iUser } from "../../interface/user.interface"

const loginService = async (data: iLogin): Promise<string> => {
    
    const userRepository = appDataSource.getRepository(User)

    const is_user: iUser | null = await userRepository.findOneBy({email: data.email})

    if(!is_user){
        throw new AppError("Email or Password invaid")
    }

    const is_validPassword = compare(
        String(is_user.password) , String(data.password)
    )

    if(!is_validPassword){
        throw new AppError("Email or Password invaid")
    }

    const token: string = jwt.sign(
        {}, 
        process.env.SECRET_KEY, 
        {
            subject: is_user.id,
            expiresIn: "24H"
        }
    )

    return token

}

export default loginService