import { IUser } from "../../models/User"
import { UserStorage } from "../../storage/mongo/user"
import DB from "../../core/db"
const storage = new UserStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe("UserStorage testing", () => {
    const user = {
        _id: "60aa6ba5561e862690fe61e9",
        name: "Nuriddin",
        email: "nurikjohn@muhammadjanov.uz",
        password: "12345678",
        passwordConfirm: "12345678"
    }

    const fakeID = "60aa6ba5561e862690fe61e3"

    test("create new user: success", () => {
        return storage.create(user as IUser).then((data) => {
            expect(data.email).toEqual(user.email)
        })
    })

    test("create new user: fail (duplicate key error)", () => {
        expect.assertions(1)

        return storage.create(user as IUser).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test("get all users: success", () => {
        return storage.find().then((data) => {
            expect(data.length).toEqual(1)
        })
    })

    test("get user by email: success", () => {
        return storage
            .findOne({
                email: user.email
            })
            .then((data) => {
                expect(data.email).toEqual(user.email)
            })
    })

    test("get user by email: fail (user not found)", () => {
        expect.assertions(1)

        return storage
            .findOne({
                email: "nurik@muhammadjanov.uz"
            })
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test("get user by id: success", () => {
        return storage.findById(user._id).then((data) => {
            expect(data.email).toEqual(user.email)
        })
    })

    test("get user by id: fail (user not found)", () => {
        expect.assertions(1)

        return storage.findById(fakeID).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test("update user by id: success", () => {
        const name = "Nurik"
        return storage
            .update(user._id, {
                name
            } as IUser)
            .then((data) => {
                expect(data.name).toEqual(name)
            })
    })

    test("update user: fail (user not found)", () => {
        expect.assertions(1)
        const name = "Nurik"

        return storage
            .update(fakeID, {
                name
            } as IUser)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test("delete user: success", () => {
        const name = "Nurik"
        return storage.delete(user._id).then((data) => {
            expect(data.email).toEqual(user.email)
        })
    })

    test("delete user: fail (user not found)", () => {
        expect.assertions(1)

        return storage.delete(user._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
