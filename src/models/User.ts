import mongoose, { Document } from "mongoose"
import bcrypt from "bcrypt"
import enumToArray from "../utils/enumToArray"

export enum UserRole {
    admin,
    user
}

export interface IUser extends Document {
    _id: string
    name: string
    email: string
    password: string
    passwordConfirm: string
    role: UserRole
    passwordChangedAt: Date
    correctPassword(candidatePassword: string, userPassword: string): Boolean
    changedPasswordAfter(JWTTimestamp: number): Boolean
    createdAt: Date
}

let userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (value: string): Boolean {
                // @ts-ignore
                return value === this.password
            },
            message: "Passwords are not the same!"
        }
    },
    role: {
        type: String,
        enum: enumToArray(UserRole),
        default: UserRole[UserRole.user]
    },
    passwordChangedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.index({ email: 1 })

userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next()

    // Hash the password with cost of 12
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, 12)

    // Delete passwordConfirm field
    // @ts-ignore
    this.passwordConfirm = undefined
    next()
})

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next()

    // @ts-ignore
    this.passwordChangedAt = Date.now() - 1000
    next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    // @ts-ignore
    if (this.passwordChangedAt) {
        // @ts-ignore
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)

        return JWTTimestamp < changedTimestamp
    }

    // False means NOT changed
    return false
}

export default mongoose.model<IUser>("User", userSchema)
