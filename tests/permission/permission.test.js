const db = require("../../models")
const permission = require("../../libs/permission");

describe('permission', () => {

  beforeEach(async () => {
    await db.casbin_rule.sync({ force: true });
  });

  it('should allow admin to get all permission', async () => {
    await db.casbin_rule.create({
      ptype: 'p',
      v0: 'admin',
      v1: 'permission',
      v2: 'getall',
      v3: 'allow'
    });

    const allow = await permission.check_permission('admin', 'permission', 'getall');
    expect(allow).toBeTruthy();
  })
})