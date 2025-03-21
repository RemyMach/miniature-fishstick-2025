import { Request, Response } from "express";
import { createUserValidation, LoginUserValidation } from "./validators/auth/create-user";
import { generateValidationErrorMessage } from "./validators/generate-validation-message";
import { compare, hash } from "bcrypt";
import { AppDataSource } from "../db/database";
import { User } from "../db/models/user";
import { QueryFailedError } from "typeorm";
import { sign } from "jsonwebtoken";
import { Token } from "../db/models/token";

export const createUser = async(req: Request, res: Response) => {
    try{
        const validation = createUserValidation.validate(req.body)
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details))
            return
        }

        const createUserRequest = validation.value
        const hashedPassword = await hash(createUserRequest.password, 10)
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.save({
            email: createUserRequest.email,
            password: hashedPassword
        })
        res.status(201).send({
            id: user.id,
            email: user.email,
            created_at: user.createdAt,
            updated_at: user.updatedAt
        })
        
    } catch(error) {
        if (error instanceof QueryFailedError && error.driverError.code === "23505") {
            res.status(400).send({"message": "email already exist"})
        }
        if (error instanceof Error) {
            console.log(error.message)
        }
        res.status(500).send({"message": "internal error"})
    }
}

export const login = async (req: Request, res: Response) => {

    try {
        const validation = LoginUserValidation.validate(req.body)
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details))
            return
        }

        const loginRequest = validation.value
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({
            email: loginRequest.email
        })
        if(user === null) {
            res.status(400).send({"message": "email or password not valid"})
            return
        }

        const isValid = await compare(loginRequest.password, user.password)
        if(!isValid) {
            res.status(400).send({"message": "email or password not valid"})
            return
        }

        const secret = "valuerandom"
        const token = sign({ userId: user.id, email: user.email}, secret, {expiresIn: '1h'})

        const tokenRepository = AppDataSource.getRepository(Token)
        const tokenCreated = await tokenRepository.save({token, user})
        res.status(201).send({token: (await tokenCreated).token})
    } catch(error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
        res.status(500).send({"message": "internal error"})
    }
} 