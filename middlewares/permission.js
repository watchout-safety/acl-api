const permission = require('../libs/permission');

module.exports.can = function(action, object, options) {
  return async function(req, res, next) {
    let identity;
    if(options.type = 'role') {
      identity = req.user[options.roleField||'role'];
    } else if (options.type = 'user_id'){
      identity = req.user[options.userIdField||'user_id'];
    } else {
      throw new Error("Type cannot be null");
    }

    const allow = await permission.check_permission(identity, object, action);
    if(allow) {
      return next();
    }

    return res.status(405).json({ status_message: "denine", status_code: "" });
  }
}