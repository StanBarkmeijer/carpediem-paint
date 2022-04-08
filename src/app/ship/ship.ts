import { Paint } from "../paint/paint";

export interface Ship {
    _id?: string,
    name: string,
    mmsi: string,
    voorschip: { part: String, paint: Paint; selected?: boolean; }[][],
    middenschip: { part: String, paint: Paint; selected?: boolean; }[][],
    achterschip: { part: String, paint: Paint; selected?: boolean; }[][],
    overigen: { part: String, paint: Paint; selected?: boolean; }[][],
}