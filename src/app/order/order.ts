import { Paint } from "../paint/paint";

export interface Order {
    _id: string,
    user: string,
    paints: Array<Paint>
}