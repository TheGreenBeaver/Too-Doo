const express = require('express');
const { User } = require('../models');
const { hash } = require('../util/cryptography');
const { authorizeWithToken } = require('../util/common-operations');
const useMiddleware = require('../middleware');


const router = express.Router();

useMiddleware(router, { prefix: 'auth.', prop: 'get', routes: ['/me'] });

router.post('/', async (req, res, next) => {
  try {
    const newUser = User.build(req.body);
    await newUser.validate();

    newUser.password = hash(req.body.password);

    const savedUser = await newUser.save();

    return authorizeWithToken({ username: savedUser.username, password: req.body.password }, res);
  } catch (e) {
    next(e);
  }
});

router.get('/me', (req, res) =>
  res.json(req.user)
);

module.exports = router;