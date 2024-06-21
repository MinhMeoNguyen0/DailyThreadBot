"use strict";

const joi = require("joi");

const envVarsSchema = joi
  .object({
    JOB_SHOULD_EXECUTE: joi.boolean()
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  worker: {
    shouldExecute: envVars.JOB_SHOULD_EXECUTE
  }
};

module.exports = config;
