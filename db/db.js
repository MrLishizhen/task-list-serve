// 数据库链接实列
const sequelize = require('./dbConnect');
const md5 = require('md5');
const adminModel = require('../model/adminModel');

(async function () {
  await sequelize.sync({
    alter: true,
  });

  // 用户表没有数据时初始化一个用户
  const adminCount = await adminModel.count();
  if (!adminCount) {
    await adminModel.create({
      username: 'admin',
      password: md5('123456'),
    });
  }

  console.log('数据库连接成功！');
})();
