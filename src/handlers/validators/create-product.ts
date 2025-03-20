import Joi from "joi"

export interface CreateProductRequest {
    name: string,
    price: number
}


export const CreateProductValidation = Joi.object<CreateProductRequest>({
    name: Joi.string()
        .min(3)
        .required(),
    price: Joi.number()
        .required(),
}).options({ abortEarly: false })