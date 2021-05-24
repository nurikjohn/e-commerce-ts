import { IOrder } from "../../models/Order"
import { OrderStorage } from "../../storage/mongo/order"
const storage = new OrderStorage()

afterAll(async () => {
    // await storage.drop()
})

describe("OrderStorage testing", () => {
    const order = {
        _id: "60aa6ba5561e862690fe61e1",
        user: "60aa6ba5561e862690fe61e9",
        cart: [
            {
                product: "60aa6ba5561e862690fe61e7",
                quantity: 3
            }
        ],
        payment: {
            date: new Date(),
            amount: 39000
        }
    }

    const fakeID = "60aa6ba5561e862690fe61e2"

    test("create new order: success", () => {
        return storage.create(order as IOrder).then((data) => {
            expect(data).toBeTruthy()
        })
    })

    test("create new order: fail (name is required)", () => {
        expect.assertions(1)

        return storage.create({} as IOrder).catch((error) => {
            expect(error.errors.name.name).toEqual("ValidatorError")
        })
    })

    test("get all orders: success", () => {
        return storage.find().then((data) => {
            expect(data.length).toEqual(1)
        })
    })

    test("get order by user: success", () => {
        return storage
            .findOne({
                user: order.user
            })
            .then((data) => {
                expect(data).toBeTruthy()
            })
    })

    test("get order by name: fail (order not found)", () => {
        expect.assertions(1)

        return storage
            .findOne({
                name: "nurik@muhammadjanov.uz"
            })
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test("get order by id: success", () => {
        return storage.findById(order._id).then((data) => {
            expect(data.user).toEqual(order.user)
        })
    })

    test("get order by id: fail (order not found)", () => {
        expect.assertions(1)

        return storage.findById(fakeID).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test("delete order: success", () => {
        const name = "Nok"
        return storage.delete(order._id).then((data) => {
            expect(data).toBeTruthy()
        })
    })

    test("delete order: fail (order not found)", () => {
        expect.assertions(1)

        return storage.delete(order._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
