import { NextFunction, Request, Response } from "express"
import { storage } from "../storage/main"
import catchAsync from "../utils/catchAsync"
import { IProduct } from "../models/Product"

export class ProductController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const products = await storage.product.find()

        res.status(200).json({
            success: true,
            data: products
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const product = await storage.product.findById(req.params.id)

        res.status(200).json({
            success: true,
            data: product
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const product = await storage.product.create(req.body as IProduct)

        res.status(201).json({
            success: true,
            data: product
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const product = await storage.product.update(req.params.id, req.body as IProduct)

        res.status(200).json({
            success: true,
            data: product
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.product.delete(req.params.id)

        res.status(204).json({
            success: true,
            data: null
        })
    })
}
