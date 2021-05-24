import mongoose, { Document } from "mongoose"

export interface ICategory extends Document {
    _id: string
    name: string
    createdAt: Date
}

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

categorySchema.index({ name: 1 })

export default mongoose.model<ICategory>("Category", categorySchema)
