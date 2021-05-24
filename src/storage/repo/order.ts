import { IOrder } from "../../models/Order"

export interface OrderRepo {
    create(payload: IOrder): Promise<IOrder>
    update(id: string, payload: IOrder): Promise<IOrder>
    delete(id: string): Promise<any>
    find(query?: Object): Promise<IOrder[]>
    findOne(query: Object): Promise<IOrder>
    findById(id: string): Promise<IOrder>
}
