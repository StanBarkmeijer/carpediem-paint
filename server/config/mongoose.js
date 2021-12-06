const mongoose = require("mongoose");
const config = require("./config");

const mongoUri = config.mongo.host;

mongoose.connect(mongoUri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: 1 
});
mongoose.connection.on("error", () => {
    throw new Error(`Unable to connect to database: ${mongoUri}`);
});