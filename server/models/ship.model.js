const mongoose = require("mongoose");
const { schema } = require("./paint.model");

const ShipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    voorschip: [
        {
            part: String,
            paint: schema
        }
    ],
    middenschip: [
        {
            part: String,
            paint: schema
        }
    ],
    achterschip: [
        {
            part: String,
            paint: schema
        }
    ],
    overigen: [
        {
            part: String,
            paint: schema
        }
    ],
});

module.exports = mongoose.model("Ships", ShipSchema);