const mongoose = require("mongoose");
const { schema, model } = require("./paint.model");

const ShipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mmsi: {
        type: String,
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

module.exports.schema = ShipSchema;
module.exports.model = mongoose.model("Ships", ShipSchema);