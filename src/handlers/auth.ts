import { Request, Response } from "express";
import { createUserValidation } from "./validators/auth/create-user";
import { generateValidationErrorMessage } from "./validators/generate-validation-message";
import { hash } from "bcrypt";

export const createUser = async(req: Request, res: Response) => {
    try{
        const validation = createUserValidation.validate(req.body)
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details))
            return
        }

        const createUserRequest = validation.value
        const hashedPassword = await hash(createUserRequest.password, 10)
        // userRepository
        // save notre user dans la db
        // return une 201 avec notre user créé sans le password
        
    } catch(error) {

    }
}