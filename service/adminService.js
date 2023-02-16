const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { loginDB } = require('../db/adminDB');
const { formatResponse } = require('../utils/tool');

// 登录
module.exports.loginService = async function (loginInfo) {
  loginInfo.password = md5(loginInfo.password);
  const data = await loginDB(loginInfo);
  if (data && data.dataValues) {
    const token = jwt.sign(data.dataValues, md5(process.env.JWT_SECRET), {
      expiresIn: 60 * 60 * 24 * 1,
    });
    return formatResponse(0, '', {
      ...data.dataValues,
      token,
    });
  }
  return data;
};
