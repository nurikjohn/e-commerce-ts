import mongoose, { Document } from "mongoose"
import { ICategory } from "./Category"
import langaugeSchema, { ILanguage } from "./Language"

export interface IProduct extends Document {
    _id: string
    name: ILanguage
    description: ILanguage
    price: number
    categories: ICategory[] | string[]
    createdAt: Date
}

let productSchema = new mongoose.Schema(
    {
        name: {
            type: langaugeSchema,
            required: true
        },
        description: {
            type: langaugeSchema,
            required: true
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
    },
    {
        strictQuery: true
    }
)

productSchema.index({ categories: 1 }, { unique: true })

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: "categories"
    })
    next()
})

export default mongoose.model<IProduct>("Product", productSchema)
