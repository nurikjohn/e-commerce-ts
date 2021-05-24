import { OrderRepo } from "../repo/order"
import Order, { IOrder } from "../../models/Order"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class OrderStorage implements OrderRepo {
    private scope = "storage.order"

    async find(query?: Object): Promise<IOrder[]> {
        try {
            let dbObj = await Order.find({ ...query })

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error.message}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IOrder> {
        try {
            let dbObj = await Order.findOne({ ...query })

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

    async findById(id: string): Promise<IOrder> {
        try {
            let dbObj = await Order.findById(id)

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

    async create(payload: IOrder): Promise<IOrder> {
        try {
            let dbObj = await Order.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error.message}`)
            throw error
        }
    }

    async update(id: string, payload: IOrder): Promise<IOrder> {
        try {
            let dbObj = await Order.findByIdAndUpdate(id, payload, {
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
            let dbObj = await Order.findByIdAndDelete(id)

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
}
