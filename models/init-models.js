var DataTypes = require("sequelize").DataTypes;
var _casbin_rule = require("./casbin_rule");

function initModels(sequelize) {
  var casbin_rule = _casbin_rule(sequelize, DataTypes);


  return {
    casbin_rule,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
