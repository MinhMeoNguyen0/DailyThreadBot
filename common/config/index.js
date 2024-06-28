

const fs = require('fs');
const path = require('path');
const _ = require('lodash');


const loadFileAssign = folderPath => {
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

module.exports = loadFileAssign(__dirname);
