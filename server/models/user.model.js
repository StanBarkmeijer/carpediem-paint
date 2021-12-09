const mongoose = require("mongoose");
const { schema } = require("./order.model"); 

const UserSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email'
        ]
    },
    hashedPassword: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    roles: [
        {
            type: String
        }
    ],
    orders: [ schema ],
    follows: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    ]
});

module.exports.schema = UserSchema;
module.exports.model = mongoose.model("Users", UserSchema);