"use strict";

const joi = require("joi");

const envVarsSchema = joi
  .object({
    AI_SHOULD_EXECUTE: joi.boolean()
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  ai: {
    shouldExecute: envVars.JOB_SHOULD_EXECUTE,
    gemini_api_key: process.env.GOOGLE_API_KEY,
  }
};

module.exports = config;
