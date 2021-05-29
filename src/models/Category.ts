import mongoose, { Document } from "mongoose"
import langaugeSchema, { ILanguage } from "./Language"

export interface ICategory extends Document {
    _id: string
    name: ILanguage
    createdAt: Date
}

let categorySchema = new mongoose.Schema({
    name: {
        type: langaugeSchema,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

categorySchema.index({ name: 1 })

export default mongoose.model<ICategory>("Category", categorySchema)
