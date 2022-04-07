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
    },
    color: {
        type: String
    }
});

module.exports.model = mongoose.model("Paints", PaintSchema);
module.exports.schema = PaintSchema;