import { NextFunction, Request, Response } from "express"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"
import { ICategory } from "../models/Category"

export class CategoryController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const categories = await storage.category.find()

        res.status(200).json({
            success: true,
            data: categories
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const category = await storage.category.findById(req.params.id)

        res.status(200).json({
            success: true,
            data: category
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body

        const category = await storage.category.create({
            name
        } as ICategory)

        res.status(201).json({
            success: true,
            data: category
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body

        const category = await storage.category.update(req.params.id, {
            name
        } as ICategory)

        res.status(200).json({
            success: true,
            data: category
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.category.delete(req.params.id)

        res.status(204).json({
            success: true,
            data: null
        })
    })
}
