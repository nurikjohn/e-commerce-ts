import { IProduct } from "../../models/Product"
import { ProductStorage } from "../../storage/mongo/product"
import DB from "../../core/db"
const storage = new ProductStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe("ProductStorage testing", () => {
    const product = {
        _id: "60aa6ba5561e862690fe61e7",
        name: "Olma",
        description: "Qizil olma",
        price: 13000,
        categories: ["60aa6ba5561e862690fe61e5"]
    }

    const fakeID = "60aa6ba5561e862690fe61e2"

    test("create new product: success", () => {
        return storage.create(product as IProduct).then((data) => {
            expect(data.name).toEqual(product.name)
        })
    })

    test("create new product: fail (name is required)", () => {
        expect.assertions(1)

        return storage.create({} as IProduct).catch((error) => {
            expect(error.errors.name.name).toEqual("ValidatorError")
        })
    })

    test("get all products: success", () => {
        return storage.find().then((data) => {
            expect(data.length).toEqual(1)
        })
    })

    test("get product by name: success", () => {
        return storage
            .findOne({
                name: product.name
            })
            .then((data) => {
                expect(data.name).toEqual(product.name)
            })
    })

    test("get product by name: fail (product not found)", () => {
        expect.assertions(1)

        return storage
            .findOne({
                name: "nurik@muhammadjanov.uz"
            })
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test("get product by id: success", () => {
        return storage.findById(product._id).then((data) => {
            expect(data.name).toEqual(product.name)
        })
    })

    test("get product by id: fail (product not found)", () => {
        expect.assertions(1)

        return storage.findById(fakeID).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test("update user by id: success", () => {
        const name = "Nok"
        return storage
            .update(product._id, {
                name
            } as IProduct)
            .then((data) => {
                expect(data.name).toEqual(name)
            })
    })

    test("update product: fail (product not found)", () => {
        expect.assertions(1)
        const name = "Nurik"

        return storage
            .update(fakeID, {
                name
            } as IProduct)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test("delete product: success", () => {
        const name = "Nok"
        return storage.delete(product._id).then((data) => {
            expect(data.name).toEqual(name)
        })
    })

    test("delete product: fail (product not found)", () => {
        expect.assertions(1)

        return storage.delete(product._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
