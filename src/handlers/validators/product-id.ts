import Joi from "joi";

export const GetProductValidation = Joi.object<ProductId>({
    id: Joi.number().required()
})


export interface ProductId {
    id: number
}