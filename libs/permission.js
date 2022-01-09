const { SequelizeConfig } = require('../models');
const casbin = require("../casbin/casbin");

module.exports.check_permission = async function(subject, object, action) {
  const { enforce } = await casbin(SequelizeConfig);
  const can = await enforce.enforce(subject, object, action);
  return can;
}