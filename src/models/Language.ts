import mongoose from "mongoose"

export interface ILanguage {
    en: string
    uz: string
}

let langaugeSchema = new mongoose.Schema({
    en: {
        type: String
    },
    uz: {
        type: String
    }
})

export default langaugeSchema

// export default mongoose.model<ILanguage>("Language", langaugeSchema)
