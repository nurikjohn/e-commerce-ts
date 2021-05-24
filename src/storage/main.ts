import { UserStorage } from "./mongo/user"
import { CategoryStorage } from "./mongo/category"
import { ProductStorage } from "./mongo/product"
import { OrderStorage } from "./mongo/order"

interface IStorage {
    user: UserStorage
    category: CategoryStorage
    product: ProductStorage
    order: OrderStorage
}

export let storage: IStorage = {
    user: new UserStorage(),
    category: new CategoryStorage(),
    product: new ProductStorage(),
    order: new OrderStorage()
}
