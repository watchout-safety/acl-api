const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const casbin = require("casbin");
const { SequelizeAdapter } = require("casbin-sequelize-adapter");

describe("acl", () => {
  it("should create table", async () => {
    const a = await SequelizeAdapter.newAdapter(config);
    const e = await casbin.newEnforcer('./tests/rbac_model.conf', a);

    let ec = await e.enforce('alice', 'data1', 'read');

    await e.addPolicies([['tip', 'data1', 'read']]);
    await e.addRoleForUser('tip', 'fuck', 'what');
  });
});
