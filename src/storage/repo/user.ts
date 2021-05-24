import { IUser } from "../../models/User"

export interface UserRepo {
    create(payload: IUser): Promise<IUser>
    update(id: string, payload: IUser): Promise<IUser>
    delete(id: string): Promise<any>
    find(query?: Object): Promise<IUser[]>
    findOne(query: Object): Promise<IUser>
    findById(id: string): Promise<IUser>
    drop(): void
}
