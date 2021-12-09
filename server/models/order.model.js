const mongoose = require("mongoose");
const Paint = require("./paint.model");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    date: {
        type: Date,
        default: Date.now
    },
    paints: [
        { 
            paint: Paint.schema,
            quantity: Number
        }
    ]
});

module.exports.schema = OrderSchema;
module.exports.model = mongoose.model("Orders", OrderSchema);