import Joi from "joi";

export interface CreateUserRequest {
    email: string;
    password: string;
}


export const createUserValidation = Joi.object<CreateUserRequest>({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required()
}).options({ abortEarly: false })

export interface LoginUserValidationRequest {
    email: string
    password: string
}

export const LoginUserValidation = Joi.object<LoginUserValidationRequest>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).options({ abortEarly: false });