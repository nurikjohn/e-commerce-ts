import { UserRepo } from "../repo/user"
import User, { IUser } from "../../models/User"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class UserStorage implements UserRepo {
    private scope = "storage.user"

    async find(query?: Object): Promise<IUser[]> {
        try {
            let dbObj = await User.find({ ...query })

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error.message}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IUser> {
        try {
            let dbObj = await User.findOne({ ...query }).select("+password")

            if (!dbObj) {
                throw new AppError(404, "Db object is not found")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error.message}`)
            throw error
        }
    }

    async findById(id: string): Promise<IUser> {
        try {
            let dbObj = await User.findById(id)

            if (!dbObj) {
                throw new AppError(404, "Db object is not found")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error.message}`)
            throw error
        }
    }

    async create(payload: IUser): Promise<IUser> {
        try {
            let dbObj = await User.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error.message}`)
            throw error
        }
    }

    async update(id: string, payload: IUser): Promise<IUser> {
        try {
            let dbObj = await User.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!dbObj) {
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
            let dbObj = await User.findByIdAndDelete(id)

            if (!dbObj) {
                throw new AppError(404, "Db object is not found")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error.message}`)
            throw error
        }
    }

    async drop() {
        await User.remove({})
    }
}
