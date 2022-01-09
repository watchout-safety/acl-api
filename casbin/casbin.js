const casbin = require('casbin');
const { SequelizeAdapter } = require("casbin-sequelize-adapter");
const model = './casbin/rbac_model.conf'

module.exports = async function(config) {
  const a = await SequelizeAdapter.newAdapter(config);
  const e = await casbin.newEnforcer(model, a);
  return { enforce: e };
}