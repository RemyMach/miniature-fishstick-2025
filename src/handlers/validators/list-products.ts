import Joi from "joi";

export interface ListProductsFilters {
    priceMax?: number;
}

export interface PaginationRequest {
    page: number;
    limit: number;
}

export const ListProductsValidation = Joi.object<ListProductsFilters & PaginationRequest>({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    priceMax: Joi.number().min(1),
}).options({ abortEarly: false })

