import Joi from "joi";

export interface UpdateProductRequest {
    id: number
    price?: number
}

export const ProductUpdateValidation = Joi.object<UpdateProductRequest>({
    id: Joi.number().required(),
    price: Joi.number().min(1).optional()
})