const express = require('express');
const { authorizeWithToken, extractToken } = require('../util/common-operations');
const { AuthToken } = require('../models/index');
const httpStatus = require('http-status');
const useMiddleware = require('../middleware/index');


const router = express.Router();

useMiddleware(router, { prefix: 'auth.', prop: 'post', routes: ['/log_out'] });

router.post('/sign_in', (req, res, next) =>
  authorizeWithToken(req.body, res).catch(next)
);

router.post('/log_out', (req, res, next) =>
  AuthToken
    .destroy({ where: { key: extractToken(req) } })
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(next)
);

module.exports = router;