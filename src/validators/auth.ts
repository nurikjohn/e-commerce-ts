import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"

export class AuthValidator {
    loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8)
    })

    signupSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        passwordConfirm: Joi.string().min(8).required()
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.loginSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.signupSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
