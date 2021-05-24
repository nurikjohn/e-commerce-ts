import mongoose, { Document } from "mongoose"
import { ICategory } from "./Category"

export interface IProduct extends Document {
    _id: string
    name: string
    description: string
    price: number
    categories: ICategory[] | string[]
    createdAt: Date
}

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

productSchema.index({ category: 1 }, { unique: true })
productSchema.index({ name: 1 })

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: "category"
    })
    next()
})

export default mongoose.model<IProduct>("Product", productSchema)
