const joi = require("joi");


GRAPH_API_VERSION = process.env.GRAPH_API_VERSION;
const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid("development", "production", "test", "local", "staging")
      .required()
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const GRAPH_API_BASE_URL = 'https://graph.threads.net/' +
    (GRAPH_API_VERSION ? GRAPH_API_VERSION + '/' : '');
const AUTHORIZATION_BASE_URL = 'https://www.threads.net';

const config = {
  env: envVars.NODE_ENV,
  graph_base_url: GRAPH_API_BASE_URL,
  author_base_url : AUTHORIZATION_BASE_URL,
  client_id: process.env.APP_ID,
  client_secret: process.env.API_SECRET,
  redirect_uri: process.env.REDIRECT_URI,
  access_token: process.env.ACCESS_TOKEN,
};
module.exports = config;
