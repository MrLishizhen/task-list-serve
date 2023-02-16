const adminModel = require('../model/adminModel');

// 登录
module.exports.loginDB = async function (loginInfo) {
  return await adminModel.findOne({
    where: {
      username: loginInfo.username,
      password: loginInfo.password,
    },
    attributes: ['id', 'username', 'profile'],
  });
};
