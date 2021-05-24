import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"

export class OrderValidator {
    createSchema = Joi.object({
        cart: Joi.array()
            .items(
                Joi.object({
                    product: Joi.string(),
                    quantity: Joi.number()
                })
            )
            .required(),
        payment: Joi.object({
            date: Joi.date(),
            amount: Joi.number()
        }).optional()
    })

    updateSchema = Joi.object({
        cart: Joi.array()
            .items(
                Joi.object({
                    product: Joi.string(),
                    quantity: Joi.number()
                })
            )
            .optional(),
        payment: Joi.object({
            date: Joi.date(),
            amount: Joi.number()
        }).optional()
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
