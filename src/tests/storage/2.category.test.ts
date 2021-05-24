import { ICategory } from "../../models/Category"
import { CategoryStorage } from "../../storage/mongo/category"
import DB from "../../core/db"
const storage = new CategoryStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe("CategoryStorage testing", () => {
    const category = {
        _id: "60aa6ba5561e862690fe61e5",
        name: "Nuriddin"
    }

    const fakeID = "60aa6ba5561e862690fe61e2"

    test("create new category: success", () => {
        return storage.create(category as ICategory).then((data) => {
            expect(data.name).toEqual(category.name)
        })
    })

    test("create new category: fail (name is required)", () => {
        expect.assertions(1)

        return storage.create({} as ICategory).catch((error) => {
            expect(error.errors.name.name).toEqual("ValidatorError")
        })
    })

    test("get all categories: success", () => {
        return storage.find().then((data) => {
            expect(data.length).toEqual(1)
        })
    })

    test("get category by name: success", () => {
        return storage
            .findOne({
                name: category.name
            })
            .then((data) => {
                expect(data.name).toEqual(category.name)
            })
    })

    test("get category by name: fail (category not found)", () => {
        expect.assertions(1)

        return storage
            .findOne({
                name: "nurik@muhammadjanov.uz"
            })
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test("get category by id: success", () => {
        return storage.findById(category._id).then((data) => {
            expect(data.name).toEqual(category.name)
        })
    })

    test("get category by id: fail (category not found)", () => {
        expect.assertions(1)

        return storage.findById(fakeID).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test("update user by id: success", () => {
        const name = "Nurik"
        return storage
            .update(category._id, {
                name
            } as ICategory)
            .then((data) => {
                expect(data.name).toEqual(name)
            })
    })

    test("update category: fail (category not found)", () => {
        expect.assertions(1)
        const name = "Nurik"

        return storage
            .update(fakeID, {
                name
            } as ICategory)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test("delete category: success", () => {
        const name = "Nurik"
        return storage.delete(category._id).then((data) => {
            expect(data.name).toEqual(name)
        })
    })

    test("delete category: fail (category not found)", () => {
        expect.assertions(1)

        return storage.delete(category._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
