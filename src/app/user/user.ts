import { Order } from "../order/order";

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
    birthday: Date,
    orders: Array<Order>
}