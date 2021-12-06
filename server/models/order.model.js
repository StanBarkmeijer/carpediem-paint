const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
    paints: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Paints"
        }
    ]
});

module.exports.schema = OrderSchema;
module.exports.model = mongoose.model("Orders", OrderSchema);