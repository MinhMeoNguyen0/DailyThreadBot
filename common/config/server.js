"use strict";

const joi = require("joi");
const common = require("./common");

const envVarsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    HOST: joi.string().default("localhost")
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

let host = envVars.HOST;
let port = envVars.PORT;

switch (common.env) {
  case "production":
    host = "http://localhost";
    break;
  case "development":
    host = "http://localhost";
    break;
  case "local":
    host = "http://localhost";
    break;
  default:
    host = "http://localhost";
    break;
}

let config = {
  server: {
    host,
    port
  }
};

module.exports = config;
