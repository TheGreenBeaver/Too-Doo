const { API_ROOT } = require('../config/settings');
const { getMeaningfulFiles } = require('../util/misc');
const path = require('path');
const { snakeCase } = require('lodash');


function useRouting(app) {
  getMeaningfulFiles(__dirname, __filename)
    .forEach(file => {
      const router = require(path.join(__dirname, file));
      app.use(`${API_ROOT}/${snakeCase(path.basename(file, '.js'))}`, router);
    });
}

module.exports = useRouting;