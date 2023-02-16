const express = require('express');
const router = express.Router();

const { loginService } = require('../service/adminService');

router.post('/login', async (req, res, next) => {
  const result = await loginService(req.body);
  res.send(result);
});

module.exports = router;
