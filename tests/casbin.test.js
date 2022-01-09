const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const casbin = require("casbin");
const { SequelizeAdapter } = require("casbin-sequelize-adapter");
const db = require('../models');
const model = "./config/rbac_model.conf";
describe("acl", () => {

  beforeEach(async () => {
    await db.casbin_rule.sync({ force: true });
  });

  it('alice cannot read data1', async () => {
    const a = await SequelizeAdapter.newAdapter(config);
    const e = await casbin.newEnforcer(model, a);

    const can = await e.enforce('alice', 'data1', 'read');
    expect(can).toBeFalsy();
  });

  it('alice can read data 1', async () => {
    const a = await SequelizeAdapter.newAdapter(config);
    const e = await casbin.newEnforcer(model, a);

    await e.addPolicies([['alice', 'data1', 'read']]);
    await e.savePolicy();

    const can = await e.enforce('alice', 'data1', 'read');
    expect(can).toBeTruthy()
  });

  it('alice can read and write via admin', async() => {
    const a = await SequelizeAdapter.newAdapter(config);
    const e = await casbin.newEnforcer(model, a);


    await e.addPolicies([
      ["admin", "data1", "write"],
      ["admin", "data1", "read"],
    ]);
    await e.addRoleForUser('alice', 'admin');
    await e.savePolicy();

    const can_write = await e.enforce('alice', 'data1', 'write');
    expect(can_write).toBeTruthy();

    const can_read= await e.enforce('alice', 'data1', 'read');
    expect(can_read).toBeTruthy();
  });


  it('root can do anything', async() => {
    const a = await SequelizeAdapter.newAdapter(config);
    const e = await casbin.newEnforcer(model, a);


    await e.addPolicies([
      ["admin", "data1", "write"],
      ["admin", "data1", "read"],
    ]);
    await e.addRoleForUser('alice', 'admin');
    await e.savePolicy();

    const can_write = await e.enforce('root', 'data1', 'write');
    expect(can_write).toBeTruthy();

    const can_read= await e.enforce('root', 'data1', 'read');
    expect(can_read).toBeTruthy();
  });
});
