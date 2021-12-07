const Joi = require("joi");

require("dotenv").config({ path: ".env" });

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow("development", "production", "test", "provision")
        .default("development"),

    SERVER_PORT: Joi.number()
        .default(8081),

    JWT_SECRET: Joi.string()
        .required()
        .description("JWT Secret required to sign"),

    MONGO_HOST: Joi.string()
        .required()
        .description("Mongo DB host URI"),

    MONGO_PORT: Joi.number()
        .default(27017),
})
    .unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) { 
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    jwtSecret: envVars.JWT_SECRET,
    frontend: envVars.MEAN_FRONTEND || 'angular',
    mongo: {
      host: envVars.MONGO_HOST,
      port: envVars.MONGO_PORT,
    },
};

module.exports = config;