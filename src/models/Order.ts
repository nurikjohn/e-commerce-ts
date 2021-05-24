import mongoose, { Document } from "mongoose"
import { IProduct } from "./Product"
import { IUser } from "./User"

export interface ICart {
    product: IProduct | string
    quantity: number
}

export interface IPayment {
    date: Date
    amount: number
}

export interface IOrder extends Document {
    _id: string
    user: IUser | string
    cart: ICart[]
    payment: IPayment
    createdAt: Date
}

let orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1
            }
        }
    ],
    payment: {
        date: {
            type: Date,
            default: Date.now
        },
        amount: {
            type: Number,
            min: 0
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

orderSchema.index({ user: 1 }, { unique: true })

orderSchema.pre(/^find/, function (next) {
    this.populate({
        path: "products",
        select: "name price"
    }).populate({
        path: "user",
        select: "_id name"
    })
    next()
})

export default mongoose.model<IOrder>("Order", orderSchema)
