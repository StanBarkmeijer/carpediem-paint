import { Paint } from "../paint/paint";

export interface Ship {
    _id: string,
    name: string,
    voorschip: Array<{ part: String, paint: Paint }>,
    middenschip: Array<{ part: String, paint: Paint }>,
    achterschip: Array<{ part: String, paint: Paint }>,
    overigen: Array<{ part: String, paint: Paint }>,
}