import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import config from "../config/config"

export class ProductValidator {
    createSchema = Joi.object({
        name: Joi.object({
            en: Joi.string().required(),
            uz: Joi.string().required()
        }).required(),
        description: Joi.object({
            en: Joi.string().required(),
            uz: Joi.string().required()
        }).required(),
        price: Joi.number().required(),
        categories: Joi.array().required()
    })

    updateSchema = Joi.object({
        name: Joi.object({
            en: Joi.string().optional(),
            uz: Joi.string().optional()
        }).optional(),
        description: Joi.object({
            en: Joi.string().optional(),
            uz: Joi.string().optional()
        }).optional(),
        price: Joi.number().optional(),
        categories: Joi.array().optional()
    })

    querySchema = Joi.object({
        lang: Joi.string().optional().default(config.language)
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = this.querySchema.validate(req.query)
        if (error) return next(error)

        req.query = value

        next()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
