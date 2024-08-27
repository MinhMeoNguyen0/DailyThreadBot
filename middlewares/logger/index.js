const morgan = require('morgan');
const chalk = require('chalk');

// Define the custom logger middleware using Morgan
const logger = morgan((tokens, req, res) => {
  // Extract necessary information from the request and response
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const status = tokens.status(req, res);
  const responseTime = tokens['response-time'](req, res) + ' ms';

  // Determine status color based on the status code
  const colorizeStatus = status >= 500
    ? chalk.red.bold(status) // Red and bold for server errors (500+)
    : status >= 400
      ? chalk.yellow.bold(status) // Yellow and bold for client errors (400+)
      : chalk.green.bold(status); // Green and bold for success (200+)

  // Colorize the method as blue
  const colorizeMethod = chalk.blue.bold(`[${method}]`);

  // Colorize the URL
  const colorizeUrl = chalk.cyan.underline(url);

  // Colorize the response time
  const colorizeResponseTime = chalk.magenta(`(${responseTime})`);

  // Construct the log message
  const logMessage = `${chalk.gray('->')}             ${colorizeMethod}         ${colorizeStatus}                   ${colorizeUrl}       ${colorizeResponseTime}`;

  // Return the formatted log message for Morgan to log
  return logMessage;
  
});

module.exports = logger;
