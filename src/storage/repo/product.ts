import { IProduct } from "../../models/Product"

export interface ProductRepo {
    create(payload: IProduct): Promise<IProduct>
    update(id: string, payload: IProduct): Promise<IProduct>
    delete(id: string): Promise<any>
    find(query?: Object): Promise<IProduct[]>
    findOne(query: Object): Promise<IProduct>
    findById(id: string): Promise<IProduct>
    drop(): void
}
