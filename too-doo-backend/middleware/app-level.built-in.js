const express = require('express');
const { isDev } = require('../util/misc');


const stack = [
  express.json()
];
if (isDev()) {
  const cors = require('cors');

  stack.push(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
  }));
}
module.exports = {
  stack,
  order: 1
};