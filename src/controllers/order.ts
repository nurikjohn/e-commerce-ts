import { NextFunction, Request, Response } from "express"
import { storage } from "../storage/main"
import catchAsync from "../utils/catchAsync"
import { IOrder } from "../models/Order"
import AppError from "../utils/appError"
import { UserRole } from "../models/User"

export class OrderController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user
        let query = {}

        if (user.role != UserRole[UserRole.admin]) {
            query = { user: user._id }
        }

        const orders = await storage.order.find(query)

        res.status(200).json({
            success: true,
            data: orders
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user
        const order = await storage.order.findById(req.params.id)

        // @ts-ignore
        if (user.role != UserRole[UserRole.admin] && order.user._id != user._id) {
            return next(new AppError(403, "Forbidden"))
        }

        res.status(200).json({
            success: true,
            data: order
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const order = await storage.order.create({
            ...req.body,
            user: res.locals.user._id
        } as IOrder)

        res.status(201).json({
            success: true,
            data: order
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user
        let order = await storage.order.findById(req.params.id)

        // @ts-ignore
        if (user.role != UserRole[UserRole.admin] && order.user._id != user._id) {
            return next(new AppError(403, "Forbidden"))
        }

        order = await storage.order.update(req.params.id, req.body as IOrder)

        res.status(200).json({
            success: true,
            data: order
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.order.delete(req.params.id)

        res.status(204).json({
            success: true,
            data: null
        })
    })
}
