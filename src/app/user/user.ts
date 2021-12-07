import { Order } from "../order/order";

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    hashedPassword: string,
    birthday: Date,
    roles: Array<string>
    orders: Array<Order>
}