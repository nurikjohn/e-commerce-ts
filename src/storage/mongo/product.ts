import { ProductRepo } from "../repo/product"
import Product, { IProduct } from "../../models/Product"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class ProductStorage implements ProductRepo {
    private scope = "storage.product"

    async find(query?: Object): Promise<IProduct[]> {
        try {
            let dbObj = await Product.find({ ...query })

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error.message}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IProduct> {
        try {
            let dbObj = await Product.findOne({ ...query })

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error.message}`)
            throw error
        }
    }

    async findById(id: string): Promise<IProduct> {
        try {
            let dbObj = await Product.findById(id)

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error.message}`)
            throw error
        }
    }

    async create(payload: IProduct): Promise<IProduct> {
        try {
            let dbObj = await Product.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error.message}`)
            throw error
        }
    }

    async update(id: string, payload: IProduct): Promise<IProduct> {
        try {
            let dbObj = await Product.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, "Db object is not found")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error.message}`)
            throw error
        }
    }

    async delete(id: string): Promise<any> {
        try {
            let dbObj = await Product.findByIdAndDelete(id)

            if (!dbObj) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, "Db object is not found")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error.message}`)
            throw error
        }
    }

    async drop() {
        await Product.remove({})
    }
}
