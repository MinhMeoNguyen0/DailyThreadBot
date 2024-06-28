const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const config = include("common/config/");
const { URLSearchParams , URL} = require('url');
const PARAMS__ACCESS_TOKEN = 'access_token';


const isAxiosErrorResponse = err => {
  return (
    !!err &&
    !!err.config &&
    !!err.config.headers &&
    !!err.config.method &&
    !!err.config.url
  );
};

exports.isAxiosErrorResponse = isAxiosErrorResponse;



exports.buildGraphAPIURL = (path, searchParams, accessToken, base_url) => {
  const url = new URL(path, base_url ?? config.common.graph_base_url);

  url.search = new URLSearchParams(searchParams);
  if (accessToken) {
      url.searchParams.append(PARAMS__ACCESS_TOKEN, accessToken);
  }
  return url.toString();
}



exports.shortenAxiosError = err => {
  if (isAxiosErrorResponse(err)) {
    if (err.config) {
      err.config = _.pick(err.config, ['data', 'headers', 'method', 'url']);
    }
    if (err.response) {
      err.response = _.pick(err.response, ['data', 'status', 'headers']);
    }
    delete err.request;
  }
  return err;
};

exports.load = folderPath => {
  const returnObject = {};
  const fileNames = fs.readdirSync(folderPath);
  fileNames.forEach(fileName => {
    if (fileName == 'index.js') return;
    if (_.startsWith(fileName, '.')) return;
    const filePath = path.resolve(folderPath, fileName);
    const keyPath = _.camelCase(fileName);
    returnObject[ keyPath ] = require(filePath).default || require(filePath);
  });
  return returnObject;
};

exports.loadAssign = folderPath => {
  const returnObject = {};
  const fileNames = fs.readdirSync(folderPath);
  fileNames.forEach(fileName => {
    if (fileName == 'index.js') return;
    if (_.startsWith(fileName, '.')) return;
    const filePath = path.resolve(folderPath, fileName);
    const keyPath = _.camelCase(fileName);
    returnObject[ keyPath ] = require(filePath).default || require(filePath);
  });
  return _.assign({}, ..._.values(returnObject));
};

exports.loadFileAssign = folderPath => {
  const returnObject = {};
  const fileNames = fs.readdirSync(folderPath);

  fileNames.forEach(fileName => {
    if (fileName == 'index.js') return;
    if (_.endsWith(fileName, '.js')) {
      const filePath = path.resolve(folderPath, fileName);
      const keyPath = _.camelCase(fileName);
      returnObject[ keyPath ] = require(filePath).default || require(filePath);
    }
  });
  return _.assign({}, ..._.values(returnObject));
};

exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[ index ], index, array);
  }
};

