import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"
import { IUser } from "../models/User"
import config from "../config/config"

type DecodedToken = {
    id: string
    iat: number
}

export class AuthController {
    signToken = (id: string) => {
        return jwt.sign({ id }, config.JwtSecret, {
            expiresIn: config.JwtExpiresIn
        })
    }

    decodeToken = async (token: string): Promise<DecodedToken> => {
        const decoded = (await jwt.verify(token, config.JwtSecret)) as DecodedToken

        return decoded
    }

    signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, passwordConfirm } = req.body

        const newUser = await storage.user.create({
            name,
            email,
            password,
            passwordConfirm
        } as IUser)

        const token = this.signToken(newUser._id)

        res.status(201).json({
            success: true,
            token
        })
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        // 1) Check if email and password exist
        if (!email || !password) {
            return next(new AppError(400, "Please provide email and password!"))
        }

        // 2) Check if user exists && password is correct
        const user = await storage.user.findOne({ email })

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError(401, "Incorrect email or password"))
        }

        // 3) If everything ok, send token to client
        const token = this.signToken(user._id)

        res.status(200).json({
            success: true,
            token
        })
    })

    protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // 1) Getting token and check of it's there
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
            return next(new AppError(401, "You are not logged in! Please log in to get access."))
        }

        // 2) Verification token
        const decoded = await this.decodeToken(token)

        // 3) Check if user still exists
        const currentUser = await storage.user.findById(decoded.id)
        if (!currentUser) {
            return next(new AppError(401, "The user belonging to this token does no longer exist."))
        }

        // 4) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next(new AppError(401, "User recently changed password! Please log in again."))
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        res.locals.user = currentUser
        next()
    })

    allowTo = (roles: string[]) =>
        catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            const user = res.locals.user

            if (!roles.includes(user.role)) return next(new AppError(403, "Not allowed"))

            next()
        })
}
