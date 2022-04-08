import { Paint } from "../paint/paint";
import { Ship } from "../ship/ship";

export interface Order {
    _id: string,
    user: string,
    date: Date,
    ship: Ship,
    paints: Array<Paint>
}