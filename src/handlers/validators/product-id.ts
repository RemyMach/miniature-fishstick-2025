import Joi from "joi";

export const ProductIdValidation = Joi.object<ProductId>({
    id: Joi.number().required()
})

export interface ProductId {
    id: number
}