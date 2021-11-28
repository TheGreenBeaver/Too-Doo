const express = require('express');
const useMiddleware = require('../middleware');
const httpStatus = require('http-status');
const { serializeToDo } = require('../serializers/to-dos');
const { pickBy } = require('lodash');


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

router.get('/', async (req, res, next) => {
  try {
    const allToDos = await req.user.getToDos();
    return res.json(allToDos.map(serializeToDo));
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const matchingToDos = await req.user.getToDos({ where: { id: req.params.id }, rejectOnEmpty: true });
    return res.json(serializeToDo(matchingToDos[0]));
  } catch (e) {
    next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const matchingToDos = await req.user.getToDos({ where: { id: req.params.id }, rejectOnEmpty: true });
    const theToDo = matchingToDos[0];
    const toUpdate = pickBy(req.body, v => v != null);
    theToDo.set(toUpdate);
    await theToDo.save();
    return res.json(serializeToDo(theToDo));
  } catch (e) {
    next(e);
  }
});

module.exports = router;