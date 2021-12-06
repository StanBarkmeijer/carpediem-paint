const mongoose = require("mongoose");

const PaintSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    url: {
        type: String
    }
});

module.exports.schema = PaintSchema;
module.exports.model = mongoose.model("Paints", PaintSchema);