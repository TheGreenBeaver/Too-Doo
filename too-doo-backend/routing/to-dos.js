const express = require('express');
const useMiddleware = require('../middleware');
const httpStatus = require('http-status');
const { serializeToDo } = require('../serializers/to-dos');


const router = express.Router();

useMiddleware(router, { prefix: 'auth.' });

router.post('/', async (req, res, next) => {
  try {
    const newToDo = await req.user.createToDo(req.body);
    return res.status(httpStatus.CREATED).json(serializeToDo(newToDo));
  } catch (e) {
    next(e);
  }
});

module.exports = router;