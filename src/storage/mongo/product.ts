import { ProductRepo } from "../repo/product"
import Product, { IProduct } from "../../models/Product"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"
import _ from "lodash"

export class ProductStorage implements ProductRepo {
    private scope = "storage.product"

    async find(query?: any): Promise<IProduct[]> {
        try {
            let dbObj = await Product.aggregate([
                { $match: _.omit(query, ["lang"]) },
                {
                    $addFields: {
                        name: `$name.${query.lang}`,
                        description: `$description.${query.lang}`
                    }
                }
            ])

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error.message}`)
            throw error
        }
    }

    async findOne(query: any): Promise<IProduct> {
        try {
            let dbObj = (await Product.aggregate([
                { $match: _.omit(query, ["lang"]) },
                {
                    $addFields: {
                        name: `$name.${query.lang}`,
                        description: `$description.${query.lang}`
                    }
                },
                { $limit: 1 }
            ])) as IProduct[]

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found")
            }

            return dbObj?.[0]
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error.message}`)
            throw error
        }
    }

    async findById(id: string, query?: any): Promise<any> {
        try {
            let dbObj = await Product.aggregate([
                { $match: { _id: id } },
                {
                    $addFields: {
                        name: `$name.${query.lang}`,
                        description: `$description.${query.lang}`
                    }
                }
            ])

            dbObj = dbObj?.[0]

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

    async update(id: string, payload: {}): Promise<IProduct> {
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
