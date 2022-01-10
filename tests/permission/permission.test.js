const db = require("../../models")
const permission = require("../../middlewares/permission");
const mockRequest = require('mock-express-request');
const mockResponse = require('mock-express-response');

describe('permission', () => {
  const next = jest.fn();

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

    const req = new mockRequest({
      user: {
        user_id: 1,
        role: 'admin'
      }
    });
    const res = new mockResponse();
    const allow = await permission.can("getall", "permission", {
      type: "role",
    })(req, res, next);

    expect(next).toHaveBeenCalledWith()
  })
})